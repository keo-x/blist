import {ExecutionContext, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'
import {ACCESS_TOKEN_STRATEGY} from '../../auth/strategies/jwt-access.stategy'
import {IS_PUBLIC_KEY} from '../decorators'

@Injectable()
export class JwTAuthGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {
  constructor(private reflector: Reflector) {
    super()
  }

  override canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
