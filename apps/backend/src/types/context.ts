import {GraphQLExecutionContext} from '@nestjs/graphql'
import {Request, Response} from 'express'

export type RestContext = {
  req: Request
  res: Response
}

export type GraphQLContext = GraphQLExecutionContext & RestContext
