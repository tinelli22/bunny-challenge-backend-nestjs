import { RoleEnum } from '../enum/role.enum';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ROLES_KEY = 'roles';
const RolesDecorator = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

export const Roles = (...roles: RoleEnum[]) => {
  return applyDecorators(
    ApiBearerAuth(),
    RolesDecorator(...roles),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden resource',
    })
  );
};