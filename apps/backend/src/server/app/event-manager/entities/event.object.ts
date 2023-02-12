import {Field, ID, ObjectType} from '@nestjs/graphql'
import {AuthUser} from '../../users/entities/user.object'
import {GuestObjectType} from './guest.object'

@ObjectType()
export class EventObjectType {
  @Field(() => ID)
  uuid!: string

  @Field(() => String)
  name!: string

  @Field(() => Date)
  date!: Date

  @Field(() => AuthUser)
  createdBy!: AuthUser

  @Field(() => [GuestObjectType], {nullable: true})
  guests?: GuestObjectType[]
}