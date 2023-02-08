import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {EVENT_ORGANIZER_ROLES} from '../users/entities/user.entity'
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

  async createEvent({
    event,
    userId,
  }: {
    event: CreateEventInput
    userId: string
  }): Promise<Event> {
    const user = this.userService.findByIdOrFail({
      uuid: userId,
    })

    if (!EVENT_ORGANIZER_ROLES.includes((await user).role)) {
      throw new Error('Unauthorized user')
    }

    const newEvent = this.eventRepository.create({
      ...event,
      createdByUuid: userId,
    })

    return this.eventRepository.save(newEvent)
  }

  addGuestToEvent({
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
    const newGuest = this.guestRepository.create({
      ...guest,
      eventUuid,
      promoterUuid,
      createdByUuid,
    })

    return this.guestRepository.save(newGuest)
  }
}
