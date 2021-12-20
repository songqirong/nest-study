import { Body, Controller, Get, ParseBoolPipe, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseDec } from 'src/common/decorators/response.decorator';
import {
  createManyUserProperty,
  createUserProperty,
  GetUsersAllResponse,
} from './classes/users';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('用户信息')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseDec(GetUsersAllResponse)
  @Get('allUsers')
  getUser() {
    return this.usersService.getAllUsers();
  }

  @ResponseDec({ ok: true })
  @Post('create')
  @ApiBody({ type: createUserProperty })
  async createUser(@Body() user) {
    await this.usersService.createUser(user);
    return true;
  }

  @ResponseDec()
  @Post('create_many')
  async createManyUser(@Body() users: createManyUserProperty) {
    await this.usersService.createManyUser(users);
    return true;
  }
}
