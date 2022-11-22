import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CounponPostInput } from './couponPost.input';

export class CounponPutInput extends CounponPostInput {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  id: string;
}
