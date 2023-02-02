import {ExecutionContext, Injectable} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'
import {MAGIC_LINK_STRATEGY_NAME} from '../../auth/strategies/magic-link.strategy'

@Injectable()
export class MagicLinkGuard extends AuthGuard(MAGIC_LINK_STRATEGY_NAME) {
  override canActivate(context: ExecutionContext) {
    const result = super.canActivate(context) as boolean
    const request = context.switchToHttp().getRequest()

    super.logIn(request)
    return result
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
