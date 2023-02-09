import {Test, TestingModule} from '@nestjs/testing'
import {EventManagerResolver} from '../event-manager.resolver'
import {EventManagerService} from '../event-manager.service'
import {eventStub} from './stubs/event.stub'

const eventManagerMock = {
  createEvent: jest.fn().mockResolvedValue(eventStub),
}
describe('EventManagerResolver', () => {
  let resolver: EventManagerResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventManagerResolver, EventManagerService],
    })
      .overrideProvider(EventManagerService)
      .useValue(eventManagerMock)
      .compile()

    resolver = module.get<EventManagerResolver>(EventManagerResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
