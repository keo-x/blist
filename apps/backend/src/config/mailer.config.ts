import {MailerOptions, MailerOptionsFactory} from '@nestjs-modules/mailer'
import {ConfigService} from '@nestjs/config'
import {isEmpty, isNil} from 'rambda'

export class MailerConfiguration implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    const defaultPort = 2025
    const isAuthSet =
      !isNil(process.env.MAIL_USERNAME) &&
      !isNil(process.env.MAIL_PASSWORD) &&
      !isEmpty(process.env.MAIL_USERNAME) &&
      !isEmpty(process.env.MAIL_PASSWORD)

    return {
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT
          ? parseInt(process.env.MAIL_PORT, 10)
          : defaultPort,
        ignoreTLS: true,
        secure: false,
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
