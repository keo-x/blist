import {Module} from '@nestjs/common'
import {PassportModule} from '@nestjs/passport'
import {MagicLinkStrategy} from './strategies/magic-link.strategy'
import {AuthResolver} from './auth.resolver'
import {UsersModule} from '../users/users.module'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {JwtModule} from '@nestjs/jwt'
import {AccessTokenStategy} from './strategies/jwt-access.stategy'

@Module({
  imports: [PassportModule.register({}), JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [MagicLinkStrategy, AccessTokenStategy, AuthResolver, AuthService],
})
export class AuthModule {}
