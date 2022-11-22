import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
  InputType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
//import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/baseAbstractClasses/base.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export abstract class User extends BaseModel {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  active: boolean;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  @HideField()
  password: string;

  @Field({ nullable: true })
  resetPassword: boolean;

  @Field({ nullable: true })
  isManager: boolean;

  @Field({ nullable: true })
  tokenRecoveryPassword: string;
}
