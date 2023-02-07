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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfiguration,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    MailerModule.forRootAsync({
      useClass: MailerConfiguration,
    }),
    UsersModule,
    AuthModule,
    EventManagerModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: JwTAuthGuard,
    },
  ],
})
export class AppModule {}
