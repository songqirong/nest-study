import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { cookiesParse } from 'src/utils/base';
import { ACCESS_TOKEN_SECRET } from 'src/utils/constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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
    return { username: payload.username, password: payload.password };
  }
}
