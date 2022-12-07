import { Body, Controller, Post } from '@nestjs/common';
import { CreditcardPostInput } from './dto/creditcardPost.input';

@Controller('creditcard')
export class CreditcardController {
   
  @Post('/add')  
  async postCreditcard(@Body() body: CreditcardPostInput) {

  }
}
