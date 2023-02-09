import {Field, ID, ObjectType} from '@nestjs/graphql'
import {AuthUser} from '../../users/entities/user.object'

@ObjectType()
export class GuestObjectType {
  @Field(() => ID)
  uuid!: string

  @Field(() => String)
  fristName!: string

  @Field(() => String)
  lastName!: string

  @Field(() => Date, {nullable: true})
  arrivedAt?: Date

  @Field(() => AuthUser)
  promoter!: AuthUser
}
