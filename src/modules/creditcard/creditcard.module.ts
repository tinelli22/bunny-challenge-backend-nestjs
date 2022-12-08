import { Module } from '@nestjs/common';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { CreditcardController } from './creditcard.controller';
import { CreditcardService } from './services/creditcard.service';

@Module({
  controllers: [CreditcardController],
  providers: [CreditcardService, CryptoService],
  imports: [CryptoService],
})
export class CreditcardModule {}
