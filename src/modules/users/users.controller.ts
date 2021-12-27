import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from 'src/common/classes/responseType';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import {
  ApiPaginatedResponse,
  ResponseDec,
} from 'src/common/decorators/response.decorator';
import {
  AlbumResponseDto,
  createUserPropertyDto,
  GetUsersAllResponseDto,
} from './constants';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
@ApiTags('用户信息')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   *
   * @returns 获取所有用户
   */
  @ApiPaginatedResponse(GetUsersAllResponseDto)
  @Get('allUsers')
  @UseGuards(JwtAuthGuard)
  getUser(): Promise<PaginatedDto<GetUsersAllResponseDto>> {
    return this.usersService.getAllUsers();
  }

  /**
   * 创建单个用户
   * @param user
   * @returns
   */
  @Public()
  @ResponseDec({ ok: true })
  @Post('create')
  @ApiBody({ type: createUserPropertyDto })
  createUser(@Body() user) {
    this.usersService.createUser(user);
    return true;
  }

  /**
   * 批量创建用户
   * @param users
   * @returns
   */
  @ResponseDec()
  @Post('create_many')
  @ApiBody({ type: [createUserPropertyDto] })
  async createManyUser(@Body() users: createUserPropertyDto[]) {
    await this.usersService.createManyUser(users);
    return true;
  }

  /**
   * 查询所有用户的照片
   * @returns
   */
  @ApiPaginatedResponse(AlbumResponseDto)
  @Get('allAblum')
  async GetAllAblum(): Promise<PaginatedDto<AlbumResponseDto>> {
    return await this.usersService.getAll();
  }

  /**
   * 删除用户的照片(单个)
   * @param id
   * @returns
   */
  @ResponseDec()
  @ApiParam({ name: 'id', description: '要删除的照片id', required: true })
  @Delete('delete/:id')
  deleteAlbum(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
  ) {
    return this.usersService.deleteUserAblum(id);
  }
}
