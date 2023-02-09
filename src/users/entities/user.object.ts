import {ObjectType, Field, ID} from '@nestjs/graphql'

@ObjectType()
export class AuthUser {
  @Field(() => ID)
  uuid!: string

  @Field(() => String)
  email!: string

  @Field({nullable: true})
  displayName?: string

  @Field({nullable: true})
  fristName?: string

  @Field(() => String, {nullable: true})
  lastName?: string
}
