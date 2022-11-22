import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;
  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  created: string;
  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updated: string;
}
