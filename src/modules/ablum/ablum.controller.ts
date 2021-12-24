import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AblumService } from './ablum.service';
import { query, Response } from 'express';
import {
  ApiTags,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ResponseDec } from 'src/common/decorators/response.decorator';
import {
  FileExportDto,
  FileUploadDto,
  FileUploadParamEnum,
  FileUploadQueryDto,
} from './classes/upload';
import { made_http_exception_obj } from 'src/utils/checkParam';

@ApiTags('文件上传')
@Controller('file')
export class AblumController {
  constructor(private readonly albumService: AblumService) {}

  @ResponseDec()
  @Post('upload/:type')
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    required: true,
    name: 'type',
    description: '上传文件类型',
    enum: FileUploadParamEnum,
    example: 'image',
  })
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file,
    @Query() query: FileUploadQueryDto,
    @Param() { type },
  ) {
    const fileUrl = `http://localhost:3000/static/${
      file.path.split('/static/')[1]
    }`;
    // user_id存在且type为image就是上传照片
    if (query.user_id) {
      if (type === 'image') {
        this.albumService.upload(fileUrl, query.user_id);
      } else {
        made_http_exception_obj('文件类型应该为image', 'type must be image');
      }
    }
    return {
      message: '上传成功',
      fileUrl,
    };
  }

  /**
   *
   * @param res
   * 下载全部文件压缩包
   */
  @ResponseDec()
  @Get('exportAll')
  async downloadAll(@Res() res: Response) {
    const { filename, tarStream } = await this.albumService.downloadAll();
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}`);
    tarStream.pipe(res);
  }

  /**
   * 下载文件压缩包
   * @param res
   * @param payload
   */
  @ResponseDec()
  @Post('export')
  async download(@Res() res: Response, @Body() payload: FileExportDto) {
    const { filename, tarStream } = await this.albumService.download(payload);
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}`);
    tarStream.pipe(res);
  }
}
