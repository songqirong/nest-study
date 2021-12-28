import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/guard/constants';
import { ROLES_KEY } from 'src/utils/constants';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
