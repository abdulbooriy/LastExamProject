import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/dto/create-user.dto';

export const ROLES_KEY = process.env.Secret_Role;
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
