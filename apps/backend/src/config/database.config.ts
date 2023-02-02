import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm'
import {SnakeNamingStrategy} from 'typeorm-naming-strategies'
import {getNodeEnv, NodeEnv} from '../constants/NodeEnv'

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const defaultPort = 5432
    const env = getNodeEnv()

    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT, 10)
        : defaultPort,
      autoLoadEntities: true,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      logging: process.env.DATABASE_LOGGING_ENABLED === 'true',
      synchronize: env !== NodeEnv.PRODUCTION,
      migrationsRun: false,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
