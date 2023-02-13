import {Injectable} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {MAGIC_LINK_STRATEGY_NAME} from '../../auth/strategies/magic-link.strategy'

@Injectable()
export class MagicLinkGuard extends AuthGuard(MAGIC_LINK_STRATEGY_NAME) {
  validate(payload: any) {
    console.log('validate')
  }
}
