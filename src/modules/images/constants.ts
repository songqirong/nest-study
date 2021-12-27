import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
/**
 * 枚举、类型相关
 */

export interface IGetImage {
  date_from?: number;
  date_to?: number;
  project?: string;
  id?: number;
  url?: string;
  limit?: number;
  page?: number;
}

export type ISaveImage = {
  date: number;
  project: string;
  url: string;
  dateFormat: string;
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
}

export class getAllImageDto extends PartialType(
  OmitType(CommonDto, ['date', 'dateFormat'] as const),
) {}

export class getAllImageResDto extends OmitType(CommonDto, [
  'date_from',
  'date_to',
  'limit',
  'page',
] as const) {}

export class UpdateImageResDto extends PickType(CommonDto, [
  'url',
  'project',
] as const) {}
