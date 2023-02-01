import {GqlOptionsFactory} from '@nestjs/graphql'
import {ApolloDriverConfig} from '@nestjs/apollo'
import {Injectable} from '@nestjs/common'
import {join} from 'path'
import {getNodeEnv, NodeEnv} from '../constants/NodeEnv'

@Injectable()
export class GraphQLConfiguration implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    const nodeEnv = getNodeEnv()
    const isProduction = nodeEnv === NodeEnv.PRODUCTION

    return {
      autoSchemaFile: join(__dirname, 'src/schema.gql'),
      sortSchema: true,
      debug: !isProduction,
      playground: !isProduction,
      nodeEnv,
    }
  }
}
