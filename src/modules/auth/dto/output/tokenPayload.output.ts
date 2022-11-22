import { RoleEnum } from '../../enum/role.enum';

export interface ITokenPayload {
  userId: string;
  email: string;
  roles: RoleEnum[];
}
