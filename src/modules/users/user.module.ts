import { Module } from '@nestjs/common';
import { PasswordService } from '../auth/services/password.service';
import { UsersService } from './services/user.service';
import { UsersServiceValidation } from './validations/user.validation';

@Module({
  providers: [
    UsersServiceValidation,
    UsersService,
    PasswordService,
  ],
  exports: [UsersServiceValidation, UsersService],
  controllers: [],
})
export class UsersModule {}
