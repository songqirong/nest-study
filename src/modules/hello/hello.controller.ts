import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  Param,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { HelloService } from './hello.service';
import { GetHelloDto, HelloPostDto } from './constants';
import { check_param } from 'src/utils/checkParam';

@ApiBearerAuth()
@ApiTags('测试')
@Controller('/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  /**
   * 查询
   * @param param0
   * @returns
   * @UseFilters(new HttpExceptionFilter()) 局部异常过滤器
   */

  @ApiQuery({ type: GetHelloDto })
  @ApiOkResponse({ description: 'ok', type: HelloPostDto })
  @ApiBadRequestResponse({ description: 'bad request' })
  @Get()
  fetch(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
  ): string {
    check_param({ id });
    return this.helloService.fetch(id);
  }

  /**
   * 创建
   * @param param0
   * @returns
   */
  @Post()
  save(@Body() { message }: HelloPostDto): string {
    return this.helloService.save(message);
  }

  /**
   * 更新
   * @param param0
   * @param param1
   * @returns
   */
  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  update(@Param() { id }, @Body() { message }: HelloPostDto): string {
    return this.helloService.update(id, message);
  }

  /**
   * 删除
   * @param param0
   * @returns
   */
  @Delete()
  @ApiQuery({ name: 'id', required: true })
  delete(@Query() { id }): string {
    return this.helloService.remove(id);
  }
}
