import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { ResponseDec } from 'src/common/decorators/response.decorator';
import { AuthService } from './auth.service';
import { AuthLoginBodyParamDto } from './constants';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('jwt 鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseDec()
  @Public()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: AuthLoginBodyParamDto })
  @Post('login')
  login(@Request() req, @Res() res) {
    this.authService.login(req.user, res);
  }

  @ResponseDec(AuthLoginBodyParamDto)
  @Get('me')
  getProfile(@Request() { user }) {
    return user;
  }
}
