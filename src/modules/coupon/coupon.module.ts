import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './services/coupon.service';

@Module({
  imports: [],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
