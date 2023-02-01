import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {GraphQLModule} from '@nestjs/graphql'
import {TypeOrmModule} from '@nestjs/typeorm'
import {DatabaseConfiguration} from './config/database.config'
import {GraphQLConfiguration} from './config/graphql.config'
import {UsersModule} from './users/users.module'

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
      imports: [ConfigModule],
      useClass: DatabaseConfiguration,
    }),
    UsersModule,
  ],
})
export class AppModule {}
