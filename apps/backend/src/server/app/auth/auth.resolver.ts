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
import {CurrentUser, Public} from '../common/decorators/'
import {JwTAuthGuard, MagicLinkGuard} from '../common/guards'
import {GraphQLContext} from '../types'
import {UserEntity} from '../users/entities/user.entity'
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

  @Public()
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
      ctx.req.user as UserEntity
    )

    // TODO extract and add the necessarry security setting
    ctx.res.cookie('racc', refreshToken, {
      httpOnly: true,
    })

    return {
      accessToken,
    }
  }

  @Query(() => AuthUser)
  @UseGuards(JwTAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.userService.findById({uuid: user.uuid})
  }
}
