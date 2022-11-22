import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CustomException } from 'src/common/controllerUtils/controllerHandling/customException';
import { UsersService } from '../services/user.service';

@Injectable()
export class UsersServiceValidation {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService
  ) {}

  // Verifica se usuario com email informado existe
  async existsWithEmail(email: string) {
    const exists = await this.userService.byQuery({ email: email });

    if (exists.data.length > 0) {
      throw new CustomException(
        'Já existe um usuário com este email cadastrado!',
        500
      );
    }
  }
}
