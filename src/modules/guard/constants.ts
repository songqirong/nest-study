import { ApiProperty } from '@nestjs/swagger';

/**
 * 枚举、类型
 */
export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}
export type Role = 'Admin' | 'User';

/**
 * Dto
 */
export class GuardPostDto {
  @ApiProperty({
    example: 123,
    description: 'user_id',
  })
  id: number;
  @ApiProperty({
    example: UserRole.Admin,
    description: 'user_role',
    enum: UserRole,
    required: false,
  })
  user: UserRole;
}
