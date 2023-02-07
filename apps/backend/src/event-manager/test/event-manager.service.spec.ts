import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Event} from '../entities/event.entity'
import {EventManagerService} from '../event-manager.service'
import {eventStub} from './stubs/event.stub'

const stub = eventStub()
const EVENT_REPOSITORY_TOKEN = getRepositoryToken(Event)
const repositoryObject = {
  create: jest.fn((stub) => stub),
  save: jest.fn(({date, name}) => stub),
}

describe('EventManagerService', () => {
  let service: EventManagerService
  let eventRepository: Repository<Event>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventManagerService,
        {
          provide: EVENT_REPOSITORY_TOKEN,
          useValue: repositoryObject,
        },
      ],
    }).compile()

    service = module.get<EventManagerService>(EventManagerService)
    eventRepository = module.get<Repository<Event>>(EVENT_REPOSITORY_TOKEN)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('repository should be defined', () => {
    expect(eventRepository).toBeDefined()
  })

  describe('#createEvent', () => {
    it('should create event with the given name and date', async () => {
      const {date, name} = eventStub()
      await service.createEvent({event: {date, name}})
      expect(eventRepository.save).toHaveBeenCalledWith({date, name})
    })
  })
})
