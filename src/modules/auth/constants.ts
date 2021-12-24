import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginBodyParamDto {
  @ApiProperty({
    description: '用户名',
    example: 'lixin',
  })
  username: string;

  @ApiProperty({
    description: '登录密码',
    example: '123123',
  })
  password: string;
}
