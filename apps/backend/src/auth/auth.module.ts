import {Module} from '@nestjs/common'
import {PassportModule} from '@nestjs/passport'
import {MagicLinkStrategy} from './strategies/magic-link.strategy'
import {AuthResolver} from './auth.resolver'
import {UsersModule} from '../users/users.module'
import {AuthController} from './auth.controller'

@Module({
  imports: [PassportModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [MagicLinkStrategy, AuthResolver],
})
export class AuthModule {}
