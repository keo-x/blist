import {ExecutionContext, Injectable} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'
import {MAGIC_LINK_STRATEGY_NAME} from '../../auth/strategies/magic-link.strategy'

@Injectable()
export class MagicLinkGuard extends AuthGuard(MAGIC_LINK_STRATEGY_NAME) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const reqest = ctx.getContext().req
    reqest.body.token = ctx.getArgs().token

    return reqest
  }
}
