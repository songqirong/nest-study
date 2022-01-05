import { Dependencies, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getCookieValue } from 'src/utils/base';
import { made_http_exception_obj } from 'src/utils/checkParam';
import { COOKIE_NAME } from 'src/utils/constants';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    !user && made_http_exception_obj('用户不存在', 'user is not exist');
    user.password !== pass &&
      made_http_exception_obj('输入密码错误', 'password is error');
    return user;
  }

  login(user: any, res: Response): any {
    res.cookie(COOKIE_NAME, this.jwtService.sign(user), {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000,
      // domain: 'persion.cn',
      // sameSite: 'none',
      // 只有https才会发送cookie
      // secure: true,
      path: '/',
    });
    res.send(true);
  }
}
