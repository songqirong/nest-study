import { ApiProperty } from '@nestjs/swagger';

export const jwtConstants = {
  secret: 'secretKey',
};

export class AuthResponse {
  @ApiProperty({ description: 'token', example: 'jwtToken' })
  access_token: string;
}

export class AuthLoginBodyParam {
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

export class AuthGetUserInfoParam {
  @ApiProperty({
    description: 'token',
    example: 'token',
  })
  token: string;
}
