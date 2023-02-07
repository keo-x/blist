import {Test, TestingModule} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {User, UserRole} from '../../users/entities/user.entity'
import {ADMIN_UUID_STUBS, userStub} from '../../users/test/subs/user.stub'
import {UserService} from '../../users/users.service'
import {Event} from '../entities/event.entity'
import {EventManagerService} from '../event-manager.service'
import {eventStub} from './stubs/event.stub'

const EVENT_REPOSITORY_TOKEN = getRepositoryToken(Event)
const repositoryObject = {
  create: jest.fn((stub) => stub),
  save: jest.fn((stub) => stub),
}

const userServiceMock = {
  findByIdOrFail: jest.fn(({uuid}: {uuid: string}) =>
    userStub({
      uuid,
    })
  ),
}

describe('EventManagerService', () => {
  let service: EventManagerService
  let eventRepository: Repository<Event>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventManagerService,
        UserService,
        {
          provide: EVENT_REPOSITORY_TOKEN,
          useValue: repositoryObject,
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .compile()

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
    const initialStub = eventStub()

    it('should create event with the given name and date', async () => {
      await service.createEvent({event: initialStub, userId: ADMIN_UUID_STUBS})
      expect(eventRepository.save).toHaveBeenCalledWith(initialStub)
    })

    it('should thow and error if event creator is not and admin or an organizer', async () => {
      expect(
        service.createEvent({
          event: {date: initialStub.date, name: initialStub.name},
          userId: '123',
        })
      ).rejects.toThrow(new Error('Unauthorized user'))
    })

    it('should create event if the person who created it is an organizer or an admin', async () => {
      expect(
        service.createEvent({event: initialStub, userId: ADMIN_UUID_STUBS})
      ).resolves.toStrictEqual(initialStub)
    })
  })
})
