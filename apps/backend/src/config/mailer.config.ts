import {MailerOptions, MailerOptionsFactory} from '@nestjs-modules/mailer'
import {ConfigService} from '@nestjs/config'
import {isEmpty} from 'rambda'

export class MailerConfiguration implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const defaultPort = 2025
    const isAuthSet =
      !isEmpty(process.env.MAIL_USERNAME) && !isEmpty(process.env.MAIL_PASSWORD)

    return {
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_HOST
          ? parseInt(process.env.MAIL_HOST, 10)
          : defaultPort,
        ignoreTLS: true,
        secure: false,
        from: process.env.DEFAULT_EMAIL,
        auth: isAuthSet
          ? {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD,
            }
          : undefined,
      },
    }
  }
}
