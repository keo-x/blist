import {InputType, Int, Field} from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email!: string

  @Field({nullable: true})
  displayName?: string

  @Field({nullable: true})
  fristName?: string

  @Field(() => String, {nullable: true})
  lastName?: string
}
