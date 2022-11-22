import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { BaseModel } from 'src/common/baseAbstractClasses/base.model';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export abstract class Coupon extends BaseModel {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  active: boolean;

  @Field()
  @IsNotEmpty()
  couponName: string;

  @Field()
  @IsNotEmpty()
  amountToUse: number;

  @Field()
  @IsNotEmpty()
  discountAmount: number;

  @Field()
  percentage: boolean;

  @Field()
  @IsNotEmpty()
  effectiveStartDate: string;

  @Field()
  effectiveEndDate: string;
}
