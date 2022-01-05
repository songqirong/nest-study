import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';

/**
 * 枚举、类型
 */

export enum FileUploadParamEnum {
  Excel = 'excel',
  Audio = 'audio',
  Image = 'image',
  Video = 'video',
  File = 'file',
  Build = 'build',
}

export type IFileType =
  | 'image'
  | 'audio'
  | 'video'
  | 'file'
  | 'excel'
  | 'build';

export type IDownObj = {
  project: string;
  type: IFileType;
};

export interface IGetFile {
  date_from?: number;
  date_to?: number;
  project?: string;
  id?: number;
  url?: string;
  limit?: number;
  page?: number;
  fileType?: IFileType;
}

export type ISaveFile = {
  date: number;
  project: string;
  url: string;
  dateFormat: string;
  fileType: IFileType;
};

/**
 * Dto
 */
export class CommonDto {
  @ApiProperty({ description: '上传时间筛选起点', example: 1640339091 })
  date_from: number;

  @ApiProperty({ description: '上传时间筛选终点', example: 1640339091 })
  date_to: number;

  @ApiProperty({ description: '图片所属项目', example: 'common' })
  project: string;

  @ApiProperty({ description: '图片id', example: 1 })
  id: number;

  @ApiProperty({ description: '图片url', example: 'http://baidu.com' })
  url: string;

  @ApiProperty({ description: '上传时间', example: 1640339091 })
  date: number;

  @ApiProperty({ description: '格式化的上传时间', example: '2021-12-25' })
  dateFormat: string;

  @ApiProperty({ description: '页码', example: 1 })
  page: number;

  @ApiProperty({ description: '条数限制', example: 10 })
  limit: number;

  @ApiProperty({
    description: '文件类型',
    enum: FileUploadParamEnum,
    default: FileUploadParamEnum.Image,
  })
  fileType: IFileType;
}

export class getAllFileDto extends PartialType(
  OmitType(CommonDto, ['date', 'dateFormat'] as const),
) {}

export class getAllFileResDto extends OmitType(CommonDto, [
  'date_from',
  'date_to',
  'limit',
  'page',
] as const) {}

export class UpdateFileResDto extends PickType(CommonDto, [
  'url',
  'project',
] as const) {}

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
  type: IFileType;
}
