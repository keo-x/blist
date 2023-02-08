import {Parent, ResolveField, Resolver} from '@nestjs/graphql'
import {isNil} from 'rambda'
import {GuestObjectType} from './entities/guest.object'

@Resolver(() => GuestObjectType)
export class GuestResolver {
  @ResolveField()
  arrivedAtEvent(@Parent() guest: GuestObjectType): boolean {
    return !isNil(guest.arrivedAt)
  }
}
