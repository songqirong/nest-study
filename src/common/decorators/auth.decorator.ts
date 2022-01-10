import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/modules/guard/constants';
import { ROLES_KEY } from 'src/utils/constants';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(RolesGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
