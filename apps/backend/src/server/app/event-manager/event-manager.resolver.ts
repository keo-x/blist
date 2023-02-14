import {Args, Resolver, Mutation} from '@nestjs/graphql'
import {CurrentUser} from '../common/decorators'
import {AuthUser} from '../users/entities/user.object'
import {AddGuestInput} from './dto'
import {CreateEventInput} from './dto/create-event.input'
import {EventObjectType} from './entities/event.object'
import {GuestObjectType} from './entities/guest.object'
import {EventManagerService} from './event-manager.service'

@Resolver(() => EventObjectType)
export class EventManagerResolver {
  constructor(private readonly eventManagerService: EventManagerService) {}

  // TODO add admin guard
  @Mutation(() => EventObjectType)
  async createEvent(
    @Args({name: 'event', type: () => CreateEventInput})
    event: CreateEventInput,
    @CurrentUser() currentUser: AuthUser
  ) {
    return this.eventManagerService.createEvent({
      event,
      userId: currentUser.uuid,
    })
  }

  // TODO add promoter guard to make sure current user is a promoter
  @Mutation(() => GuestObjectType)
  async addGuestToEvent(
    @Args('guest', {type: () => AddGuestInput}) guest: AddGuestInput,
    @Args('eventUuid', {type: () => String}) eventUuid: string,
    @CurrentUser() currentUser: {uuid: string}
  ): Promise<GuestObjectType> {
    return this.eventManagerService.addGuestToEvent({
      eventUuid,
      guest,
      promoterUuid: currentUser.uuid,
      createdByUuid: currentUser.uuid,
    })
  }

  // TODO add admin guard
  @Mutation(() => GuestObjectType)
  async toggleGuestArrivalState(
    @Args('guestUuid', {type: () => String}) guestUuid: string
  ) {
    return this.eventManagerService.toggleGuestArrivalState({guestUuid})
  }
}
