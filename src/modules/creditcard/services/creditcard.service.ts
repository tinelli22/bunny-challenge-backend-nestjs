import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BaseService } from 'src/common/baseAbstractClasses/base.service';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { ResponseDefaultType } from 'src/common/types/responseDefault';
import { User } from 'src/modules/users/models/user.model';
import { CreditcardPostInput } from '../dto/creditcardPost.input';
import { CreditcardPutInput } from '../dto/creditcardPut.input';
import { Creditcard } from '../models/creditcard.model';

@Injectable()
export class CreditcardService extends BaseService {
  constructor(private cryptoService: CryptoService, prisma: PrismaService) {
    super();
    super.collectionName = 'Creditcard';
    super.prisma = prisma;
  }

  async add(
    input: CreditcardPostInput,
    user: User
  ): Promise<ResponseDefaultType> {
    const { cardNumber, expirationDate, holder, creditToken } = input;

    const cryptedCardNumber = this.cryptoService.cryptAES(cardNumber);
    const cryptedExpirationDate = this.cryptoService.cryptAES(expirationDate);
    const cryptedHolder = this.cryptoService.cryptAES(holder);

    const data = {
      cardNumber: cryptedCardNumber,
      expirationDate: cryptedExpirationDate,
      creditToken,
      holder: cryptedHolder,
      userId: user.id,
    };

    const resp = await this.create(data);
    return {
      success: true,
      data: this.decodeAesAttributes(resp.data),
    };
  }

  async updateCreditCard(
    id: string,
    input: CreditcardPutInput
  ): Promise<ResponseDefaultType> {
    const { cardNumber, expirationDate, holder, ...rest } = input;

    const cryptedCardNumber = this.cryptoService.cryptAES(cardNumber);
    const cryptedExpirationDate = this.cryptoService.cryptAES(expirationDate);
    const cryptedHolder = this.cryptoService.cryptAES(holder);

    const data = {
      ...rest,
      cardNumber: cryptedCardNumber,
      expirationDate: cryptedExpirationDate,
      holder: cryptedHolder,
    };

    const resp = await this.update(id, data);
    return {
      success: true,
      data: this.decodeAesAttributes(resp.data),
    };
  }

  async getAll(userId: string): Promise<ResponseDefaultType> {
    const query = { userId };
    const { data } = await this.byQuery(query);
    const creditcards = (data as Creditcard[]).map((cd) => {
      return this.decodeAesAttributes(cd);
    });

    return {
      success: true,
      data: creditcards,
    };
  }

  private decodeAesAttributes(object: Creditcard) {
    return {
      ...object,
      cardNumber: this.cryptoService.decryptAES(object.cardNumber),
      expirationDate: this.cryptoService.decryptAES(object.expirationDate),
      holder: this.cryptoService.decryptAES(object.holder),
    };
  }
}
