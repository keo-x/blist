/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'

import {ServerModule} from './server.module'

async function bootstrap() {
  const app = await NestFactory.create(ServerModule)
  const port = process.env.PORT || 3333
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

bootstrap()