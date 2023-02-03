import {Injectable, UnauthorizedException} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {PassportStrategy} from '@nestjs/passport'
import MagicLoginStrategy from 'passport-magic-login'
import {MailerService} from '@nestjs-modules/mailer'
import {UserService} from '../../users/users.service'
import {isNil} from 'rambda'

export const MAGIC_LINK_STRATEGY_NAME = 'magic-link'

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(
  MagicLoginStrategy,
  MAGIC_LINK_STRATEGY_NAME
) {
  constructor(
    private readonly config: ConfigService,
    private readonly mailService: MailerService,
    private readonly userService: UserService
  ) {
    super({
      secret: config.get('MAGIC_LINK_SECRET'),
      callbackUrl: '/auth/magic-link/confirm',
      sendMagicLink: async (
        email: string,
        href: string,
        verificationCode: string
      ) => {
        const link = `${config.get('DASHBOARD_URL')}${href}`

        return mailService.sendMail({
          from: config.get('DEFAULT_EMAIL'),
          to: email,
          subject: `Your login link`,
          text: `Hey! Click on this link to finish logging in: ${link}\nMake sure the verification code matches ${verificationCode}!`,
        })
      },
      // @ts-expect-error unable to type the verify method correctly
      verify: async (payload, done) => {
        const user = await userService.findByEmail(payload.destination)
        if (isNil(user)) {
          done(new UnauthorizedException())
        }
        done(null, user)
      },
    })
  }
}
