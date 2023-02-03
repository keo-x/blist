import {UnauthorizedException, UseGuards} from '@nestjs/common'
import {
  Args,
  Context,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql'
import {isNil} from 'rambda'
import {CurrentUser} from '../common/decorators/current-user'
import {MagicLinkGuard} from '../common/guards'
import {JwTGuard} from '../common/guards/jwt.guard'
import {GraphQLContext} from '../types'
import {User} from '../users/entities/user.entity'
import {AuthUser} from '../users/entities/user.object'
import {UserService} from '../users/users.service'
import {AuthService} from './auth.service'

@ObjectType()
class LoginResponse {
  @Field(() => String)
  accessToken!: string
}

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(MagicLinkGuard)
  login(
    @Args({name: 'token', type: () => String}) token: string,
    @Context() ctx: GraphQLContext
  ) {
    if (isNil(ctx.req.user)) {
      throw new UnauthorizedException()
    }

    const {accessToken, refreshToken} = this.authService.login(
      ctx.req.user as User
    )

    return {
      accessToken,
    }
  }

  @Query(() => AuthUser)
  @UseGuards(JwTGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.userService.findById({uuid: user.uuid})
  }
}
