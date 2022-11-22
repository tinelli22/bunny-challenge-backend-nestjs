import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PasswordService } from 'src/modules/auth/services/password.service';
import { ChangePasswordInput } from '../dto/change-password.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { BaseService } from 'src/common/baseAbstractClasses/base.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(prisma: PrismaService, private passwordService: PasswordService) {
    super();
    super.collectionName = 'user';
    super.prisma = prisma;
  }

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma[this.collectionName].update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma[this.collectionName].update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}
