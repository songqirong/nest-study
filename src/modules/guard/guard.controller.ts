import {
  Controller,
  Get,
  Query,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { GuardService } from './guard.service';
import { check_param } from 'src/utils/checkParam';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ResponseDec } from 'src/common/decorators/response.decorator';
import { GuardPostDto } from './constants';

@ApiTags('测试守卫')
@Controller('/guard')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  /**
   * 查询
   * @param param0
   * @returns
   * @UseFilters(new HttpExceptionFilter()) 局部异常过滤器
   */

  @ApiQuery({ type: GuardPostDto })
  @Auth('Admin')
  @ResponseDec(GuardPostDto)
  @Get()
  fetch(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
  ): string {
    check_param({ id });
    return this.guardService.fetch(id);
  }
}
