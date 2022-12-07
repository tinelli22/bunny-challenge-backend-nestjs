import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { BaseModel } from 'src/common/baseAbstractClasses/base.model';
import { User } from 'src/modules/users/models/user.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export abstract class Creditcard extends BaseModel {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  active: boolean;

  @Field()
  @IsNotEmpty()
  cardNumber: string;

  @Field()
  @IsNotEmpty()
  creditToken: string;

  @Field()
  @IsNotEmpty()
  expirationDate: string;

  @Field()
  @IsNotEmpty()
  holder: string;

  @Field()
  @IsNotEmpty()
  user: User;
}
