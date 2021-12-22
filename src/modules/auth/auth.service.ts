import { Dependencies, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { getCookieValue } from 'src/utils/base';
import { COOKIE_NAME } from 'src/utils/constants';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = { name: 'walker123', password: '123321' };
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // 验证通过
      return true;
    }
    // 验证失败
    return false;
  }

  login(user: any, res: Response): any {
    res.cookie(COOKIE_NAME, this.jwtService.sign(user), {
      httpOnly: true,
      maxAge: 7 * 24 * 3600 * 1000,
      // domain: 'persion.cn',
      sameSite: 'none',
      // 只有https才会发送cookie
      secure: true,
      path: '/',
    });
    res.send(true);
  }
}
