import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Coupon } from '../models/coupon.model';
import { BaseService } from 'src/common/baseAbstractClasses/base.service';
import { ResponseDefaultType } from 'src/common/types/responseDefault';
import { CustomException } from 'src/common/controllerUtils/controllerHandling/customException';

@Injectable()
export class CouponService extends BaseService {
  constructor(prisma: PrismaService) {
    super();
    super.collectionName = 'Coupon';
    super.prisma = prisma;
  }

  async couponExists(query: any) {
    const exists = await this.byQuery(query);

    if (exists.data.length > 0) {
      throw new CustomException('Já existe um cupom com esse nome', 500);
    }
  }

  async create(data: any): Promise<ResponseDefaultType> {
    await this.couponExists({ couponName: data.couponName });

    delete data.id; // remove id from data
    data.created = new Date().toISOString();
    const coupon = await this.prisma[this.collectionName].create({
      data,
    });

    return {
      success: true,
      data: coupon,
    };
  }

  async update(id: string, data: any): Promise<ResponseDefaultType> {
    await this.couponExists({
      AND: { couponName: data.couponName, id: { not: id } },
    });

    delete data.id; // remove id from data
    data.updated = new Date().toISOString();
    const coupon = await this.prisma[this.collectionName].update({
      data,
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: coupon,
    };
  }

  async active(id: string, active: string): Promise<ResponseDefaultType> {
    const couponData = await this.byId(id);
    const data = couponData.data;

    delete data.id; // remove id from data
    data.active = active == 'false' ? false : true;
    data.updated = new Date().toISOString();

    const coupon = await this.prisma[this.collectionName].update({
      data,
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: coupon,
    };
  }
}
