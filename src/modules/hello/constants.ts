import { ApiProperty } from '@nestjs/swagger';
/**
 * 类型，枚举
 */
export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

/**
 * Dto
 */
export class HelloPostDto {
  @ApiProperty({
    example: 'Kitty',
    description: 'The message what are you want',
  })
  message: string;
}
