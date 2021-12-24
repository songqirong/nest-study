import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { cookiesParse } from 'src/utils/base';
import { ACCESS_TOKEN_SECRET } from 'src/utils/constants';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (req: Request) => {
        const cookies = ExtractJwt.fromHeader('cookie')(req);
        return cookiesParse(cookies);
      },
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const user = { username: payload.username, password: payload.password };
    await this.authService.validateUser(user.username, user.password);
    return user;
  }
}
