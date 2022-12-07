import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export abstract class CreditcardPostInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  expirationDate: string;

  @ApiProperty()
  @Field()
  @IsNotEmpty()
  holder: string;
}
