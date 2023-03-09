import {Injectable, Logger, OnModuleInit} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import next from 'next'
import {NextServer} from 'next/dist/server/next'

@Injectable()
export class ViewService implements OnModuleInit {
  private server!: NextServer
  private readonly logger = new Logger('Viewservice')

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: this.configService.get<string>('NODE_ENV') !== 'production',
        dir: './apps/backend/src/client',
      })
      await this.server.prepare()
    } catch (error) {
      this.logger.error(error)
    }
  }

  getNextServer(): NextServer {
    return this.server
  }
}
