import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Header,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ResponseDec } from 'src/common/decorators/response.decorator';
import { AuthService } from './auth.service';
import { AuthResponse, AuthLoginBodyParam } from './constants';

@ApiTags('jwt 鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseDec(AuthResponse)
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AuthLoginBodyParam })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ResponseDec(AuthLoginBodyParam)
  @ApiHeader({ name: 'token' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() { user }) {
    return user;
  }
}
