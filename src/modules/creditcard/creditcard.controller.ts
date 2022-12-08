import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserEntity } from '../users/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { CreditcardPostInput } from './dto/creditcardPost.input';
import { CreditcardPutInput } from './dto/creditcardPut.input';
import { CreditcardService } from './services/creditcard.service';

@Controller('creditcard')
export class CreditcardController {
  constructor(private readonly creditcardService: CreditcardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async postCreditcard(
    @Body() body: CreditcardPostInput,
    @UserEntity() user: User
  ) {
    return await this.creditcardService.add(body, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async putCreditcard(
    @Param('id') id: string,
    @Body() body: CreditcardPutInput
  ) {
    this.creditcardService.updateCreditCard(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.creditcardService.delete(id);
  }
}
