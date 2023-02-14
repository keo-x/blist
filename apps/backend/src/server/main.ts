/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'

import {ServerModule} from './server.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ServerModule)
  const port = process.env.PORT || 3333

  app.useStaticAssets(join(__dirname, 'server', 'assets'), {
    prefix: '/public/',
  })

  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()
