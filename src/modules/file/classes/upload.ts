import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 枚举、类型
 */

export enum FileUploadParamEnum {
  Excel = 'excel',
  Audio = 'audio',
  Image = 'image',
  Video = 'video',
  File = 'file',
}

export type IDownObj = {
  project: string;
  type: 'image' | 'audio' | 'video' | 'file' | 'excel';
};
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FileUploadQueryDto {
  @ApiPropertyOptional({
    description: '用户Id',
  })
  user_id: number;

  @ApiPropertyOptional({ description: '所属项目' })
  project: string;
}

export class FileExportDto {
  @ApiProperty({ description: '所属项目', example: 'common' })
  project: string;

  @ApiProperty({
    description: '文件类型',
    enum: FileUploadParamEnum,
    default: FileUploadParamEnum.Image,
  })
  type: FileUploadParamEnum;
}

export class FileUploadParamDto {
  @ApiPropertyOptional({
    description: '上传文件类型',
    enum: FileUploadParamEnum,
    default: FileUploadParamEnum.Image,
  })
  type: FileUploadParamEnum;
}
