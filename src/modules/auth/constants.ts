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

export enum getEnum {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhZ2Rrd2d3YWQiLCJwYXNzd29yZCI6IjEyMjMyMzIiLCJpYXQiOjE2Mzk4MTExNzcsImV4cCI6MTYzOTgxMTc3N30.8sAhmgJImW90M_yzuQDcKGGf8p6rVf-jtHZenX-IVAM',
}
