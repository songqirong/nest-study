import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedDto } from 'src/common/classes/responseType';
import { ApiPaginatedResponse } from 'src/common/decorators/response.decorator';
import { getAllImageDto, getAllImageResDto } from './constants';
import { ImagesService } from './images.service';

@ApiTags('图片管理')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  /**
   * 获取所有图片
   * @param body
   * @returns
   */
  @ApiPaginatedResponse(getAllImageResDto)
  @Post('/getImages')
  async getImages(
    @Body() body: getAllImageDto,
  ): Promise<PaginatedDto<getAllImageResDto>> {
    return await this.imagesService.getAllImages(body);
  }
}
