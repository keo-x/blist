import {Injectable, OnModuleInit} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {dir} from 'console'
import next from 'next'
import {NextServer} from 'next/dist/server/next'
import {join} from 'path'

@Injectable()
export class ViewService implements OnModuleInit {
  private server!: NextServer

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: this.configService.get<string>('NODE_ENV') !== 'production',
        dir: './apps/backend/src/client',
      })
      await this.server.prepare()
    } catch (error) {
      console.log(error)
    }
  }

  getNextServer(): NextServer {
    return this.server
  }
}
