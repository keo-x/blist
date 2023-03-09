import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import dayjs from 'dayjs'
import {isNil} from 'rambda'
import {Repository} from 'typeorm'
import {EVENT_ORGANIZER_ROLES, UserRole} from '../users/entities/user.entity'
import {UserService} from '../users/users.service'
import {AddGuestInput} from './dto'
import {CreateEventInput} from './dto/create-event.input'
import {Event} from './entities/event.entity'
import {Guest} from './entities/guest.entity'

@Injectable()
export class EventManagerService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    private readonly userService: UserService
  ) {}

  async getAllEvents({
    filter,
  }: {
    filter: {
      withGuests: boolean
    }
  }) {
    return this.eventRepository.find({
      order: {
        date: 'DESC',
      },
      relations: {
        guests: filter?.withGuests,
      },
    })
  }

  async findEventById({uuid}: {uuid: string}) {
    return this.eventRepository.findOneBy({
      uuid,
    })
  }

  async createEvent({
    event,
    userId,
  }: {
    event: CreateEventInput
    userId: string
  }): Promise<Event> {
    const user = await this.userService.findByIdOrFail({
      uuid: userId,
    })

    if (!EVENT_ORGANIZER_ROLES.includes(user.role)) {
      throw new Error('Unauthorized user')
    }

    const newEvent = this.eventRepository.create({
      ...event,
      createdByUuid: userId,
    })

    return this.eventRepository.save(newEvent)
  }

  async addGuestToEvent({
    guest,
    eventUuid,
    promoterUuid,
    createdByUuid,
  }: {
    guest: AddGuestInput
    eventUuid: string
    promoterUuid: string
    createdByUuid?: string
  }) {
    const promoter = await this.userService.findByIdOrFail({
      uuid: promoterUuid,
    })

    if (promoter.role !== UserRole.PROMOTER) {
      throw new Error('Guest can only be invited by event promoters')
    }

    const newGuest = this.guestRepository.create({
      ...guest,
      eventUuid,
      promoterUuid,
      createdByUuid,
    })

    return this.guestRepository.save(newGuest)
  }

  async toggleGuestArrivalState({guestUuid}: {guestUuid: string}) {
    const guest = await this.guestRepository.findOneByOrFail({uuid: guestUuid})

    const arrivedAt = isNil(guest.arrivedAt) ? dayjs() : undefined
    this.guestRepository.update(guestUuid, {
      arrivedAt,
    })

    return this.guestRepository.findOneByOrFail({uuid: guestUuid})
  }
}
