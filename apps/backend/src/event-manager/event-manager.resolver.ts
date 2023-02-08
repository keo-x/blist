import {Args, Resolver, Query, Mutation} from '@nestjs/graphql'
import {CurrentUser} from '../common/decorators'
import {AuthUser} from '../users/entities/user.object'
import {CreateEventInput} from './dto/create-event.input'
import {EventObjectType} from './entities/event.object'
import {EventManagerService} from './event-manager.service'

@Resolver()
export class EventManagerResolver {
  constructor(private readonly eventManagerService: EventManagerService) {}

  @Mutation(() => EventObjectType)
  async createEvent(
    @Args({name: 'event', type: () => CreateEventInput})
    event: CreateEventInput,
    @CurrentUser() currentUser: AuthUser
  ) {
    console.log(event, currentUser)
    return this.eventManagerService.createEvent({
      event,
      userId: currentUser.uuid,
    })
  }
}
