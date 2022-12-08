import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BaseService } from 'src/common/baseAbstractClasses/base.service';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { ResponseDefaultType } from 'src/common/types/responseDefault';

@Injectable()
export class CreditcardService extends BaseService {
  constructor(private cryptoService: CryptoService, prisma: PrismaService) {
    super();
    super.collectionName = 'Creditcard';
    super.prisma = prisma;
  }

  async create(data): Promise<ResponseDefaultType> {
    const { cardNumber, expirationDate, holder, user, creditToken } = data;

    const cryptedCardNumber = this.cryptoService.cryptAES(cardNumber);
    const cryptedExpirationDate = this.cryptoService.cryptAES(expirationDate);
    const cryptedHolder = this.cryptoService.cryptAES(holder);

    const resp = await this.prisma[this.collectionName].create({
      data: {
        cardNumber: cryptedCardNumber,
        expirationDate: cryptedExpirationDate,
        creditToken,
        holder: cryptedHolder,
        userId: user.id,
      },
    });

    return {
      success: true,
      data: resp,
    };
  }
}
