import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class AddGuestInput {
  @Field(() => String)
  firstName!: string

  @Field(() => String)
  lastName!: string
}
