import {SnakeNamingStrategy} from 'typeorm-naming-strategies'
import {getNodeEnv, NodeEnv} from '../constants/NodeEnv'

import {registerAs} from '@nestjs/config'
import {DataSourceOptions} from 'typeorm'
import {join} from 'path'

export const getDatabaseConfig = (): DataSourceOptions => {
  const env = getNodeEnv()
  const defaultPort = 5432

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : defaultPort,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: process.env.DATABASE_LOGGING_ENABLED === 'true',
    synchronize: env !== NodeEnv.PRODUCTION,
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(process.cwd(), 'src/**/*.entity.{js,ts}')],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  }
}

export default registerAs<DataSourceOptions>('database', getDatabaseConfig)
