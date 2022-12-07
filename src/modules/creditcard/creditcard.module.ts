import { Module } from '@nestjs/common';
import { CreditcardController } from './creditcard.controller';

@Module({
    controllers: [
        CreditcardController
    ]
})
export class CreditcardModule {}
