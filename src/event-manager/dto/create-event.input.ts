import {Field, InputType} from '@nestjs/graphql'

@InputType()
export class CreateEventInput {
  @Field(() => String)
  name!: string

  @Field(() => Date)
  date!: Date
}
