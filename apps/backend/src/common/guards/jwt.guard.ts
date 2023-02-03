import {ExecutionContext} from '@nestjs/common'
import {GqlExecutionContext} from '@nestjs/graphql'
import {AuthGuard} from '@nestjs/passport'
import {ACCESS_TOKEN_STRATEGY} from '../../auth/strategies/jwt-access.stategy'

export class JwTGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
