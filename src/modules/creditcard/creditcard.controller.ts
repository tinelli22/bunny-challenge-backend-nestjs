import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserEntity } from '../users/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { CreditcardPostInput } from './dto/creditcardPost.input';
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
    return await this.creditcardService.create({ ...body, user });
  }
}
