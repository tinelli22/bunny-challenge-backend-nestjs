import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpErrorFilter } from 'src/common/controllerUtils/controllerHandling/httpErrorFilter';
import { Roles } from '../auth/decorators/roles.decorator';
import { AllRoles, RoleEnum } from '../auth/enum/role.enum';
import { CounponPostInput } from './dto/couponPost.input';
import { CounponPutInput } from './dto/couponPut.input';
import { Coupon } from './models/coupon.model';
import { CouponService } from './services/coupon.service';

@Roles(...AllRoles)
@UseFilters(new HttpErrorFilter())
@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.couponService.all();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getById(@Param('id') id: string): Promise<any> {
    return await this.couponService.byId(id);
  }

  @Post()  
  @ApiResponse({ status: 200, description: 'Cupom gravado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao gravar cupom' })
  async postCoupon(@Body() body: CounponPostInput) {
    return await this.couponService.create(body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cupom alterado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao alterar cupom' })
  async putCoupon(@Body() body: CounponPutInput) {
    return await this.couponService.update(body.id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cupom deletado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar cupom' })
  async deleteCoupon(@Param('id') id: string) {
    return await this.couponService.delete(id);
  }
}
