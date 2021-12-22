import {
  Body,
  Controller,
  Dependencies,
  Get,
  ParseBoolPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from 'src/common/classes/responseType';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import {
  ApiPaginatedResponse,
  ResponseDec,
} from 'src/common/decorators/response.decorator';
import { createUserProperty, GetUsersAllResponse } from './classes/users';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('用户信息')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiPaginatedResponse(GetUsersAllResponse)
  @Get('allUsers')
  @UseGuards(JwtAuthGuard)
  getUser(): Promise<PaginatedDto<GetUsersAllResponse>> {
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
  @ApiBody({ type: [createUserProperty] })
  async createManyUser(@Body() users: createUserProperty[]) {
    await this.usersService.createManyUser(users);
    return true;
  }
}
