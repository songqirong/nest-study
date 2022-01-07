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
import { FileService } from './file.service';
import { Response } from 'express';
import { ApiTags, ApiConsumes, ApiParam, ApiBody } from '@nestjs/swagger';
import {
  ApiPaginatedResponse,
  ResponseDec,
} from 'src/common/decorators/response.decorator';
import {
  FileExportDto,
  FileUploadDto,
  FileUploadParamEnum,
  FileUploadQueryDto,
  getAllFileDto,
  getAllFileResDto,
} from './constants';
import { UsersService } from '../users/users.service';
import { PaginatedDto } from 'src/common/classes/responseType';

@ApiTags('文件上传')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly usersService: UsersService,
  ) {}

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
  async upload(
    @UploadedFile() file,
    @Query() query: FileUploadQueryDto,
    @Param() { type },
  ) {
    const fileUrl = `${
      process.env.CURRENT_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://nest.persion.cn'
    }/static/${file.path.split('/static/')[1]}`;
    const { project = 'common', user_id } = query;
    // user_id存在且type为image就是上传照片
    if (type === FileUploadParamEnum.Image && user_id) {
      await this.usersService.upload(fileUrl, user_id);
    }
    const now = new Date();
    await this.fileService.saveFile({
      url: fileUrl,
      dateFormat: now.toLocaleDateString(),
      project,
      date: parseInt((now.getTime() / 1000).toString()),
      fileType: type,
    });

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
    const { filename, tarStream } = await this.fileService.downloadAll();
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
    const { filename, tarStream } = await this.fileService.download(payload);
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}`);
    tarStream.pipe(res);
  }

  /**
   * 获取所有文件基本信息
   * @param body
   * @returns
   */
  @ApiPaginatedResponse(getAllFileResDto)
  @Post('/getFiles')
  async getImages(
    @Body() body: getAllFileDto,
  ): Promise<PaginatedDto<getAllFileResDto>> {
    return await this.fileService.getAllFiles(body);
  }
}
