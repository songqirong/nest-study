import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AblumService } from './ablum.service';
import { Response } from 'express';
import { ApiTags, ApiExtraModels, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ResponseDec } from 'src/common/decorators/response.decorator';
import { FileUploadDto } from './classes/upload';

@ApiTags('文件上传')
@Controller('ablum')
export class AblumController {
  constructor(private readonly albumService: AblumService) {}

  @ResponseDec()
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '用户照片', type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    this.albumService.upload(file);
    return true;
  }

  @ResponseDec()
  @Get('export')
  async downloadAll(@Res() res: Response) {
    const { filename, tarStream } = await this.albumService.downloadAll();
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=${filename}`);
    tarStream.pipe(res);
  }
}
