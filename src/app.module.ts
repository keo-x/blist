import * as path from 'path'
import {RemixModule} from 'nest-remix'
import {HelloWorldBackend} from './routes/hello-world.server'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {GraphQLModule} from '@nestjs/graphql'
import {TypeOrmModule} from '@nestjs/typeorm'
import {MailerModule} from '@nestjs-modules/mailer'
import {GraphQLConfiguration} from './config/graphql.config'
import {MailerConfiguration} from './config/mailer.config'

import {UsersModule} from './users/users.module'
import {AuthModule} from './auth/auth.module'
import {APP_GUARD} from '@nestjs/core'
import {JwTAuthGuard} from './common/guards/'
import {EventManagerModule} from './event-manager/event-manager.module'
import databaseConfig from './config/database.config'
import {DataSourceOptions} from 'typeorm'
import {join} from 'path'

@RemixModule({
  publicDir: path.join(process.cwd(), 'public'),
  browserBuildDir: path.join(process.cwd(), 'build/'),
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfiguration,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeormConfig =
          configService.getOrThrow<DataSourceOptions>('database')

        return {
          ...typeormConfig,
          entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
          autoLoadEntities: true,
        }
      },
    }),
    MailerModule.forRootAsync({
      useClass: MailerConfiguration,
    }),
    UsersModule,
    AuthModule,
    EventManagerModule,
  ],

  providers: [HelloWorldBackend],
})
export class AppModule {}
