import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export class HelloPost {
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

export type Role = 'Admin' | 'User';
