import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export abstract class CounponPostInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  couponName: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  amountToUse: number;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  discountAmount: number;

  @ApiProperty()
  @Field()
  percentage: boolean;
}
