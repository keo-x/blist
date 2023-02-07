import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateEventInput} from './dto/create-event.input'
import {Event} from './entities/event.entity'

@Injectable()
export class EventManagerService {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>
  ) {}

  async createEvent({event}: {event: CreateEventInput}): Promise<Event> {
    const newEvent = this.eventRepository.create(event)
    return this.eventRepository.save(newEvent)
  }
}
