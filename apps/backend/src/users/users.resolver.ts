import {Args, Query, Resolver, ResolveField, Root} from '@nestjs/graphql'
import {UserService} from './users.service'
import {AuthUser} from './entities/user.object'
import {User} from './entities/user.entity'
import {isNil} from 'rambda'

@Resolver(() => AuthUser)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => [AuthUser], {name: 'users'})
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => AuthUser, {name: 'user'})
  findOne(@Args('uuid', {type: () => String}) uuid: string) {
    return this.usersService.findById({uuid})
  }

  @ResolveField(() => Boolean)
  isOnboarded(@Root() user: User): boolean {
    return isNil(user.onboardedAt)
  }
}
