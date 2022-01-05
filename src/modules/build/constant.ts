import { ApiProperty } from '@nestjs/swagger';

/**
 * 类型
 */
export type IService = {
  port: number;
  project_name: string;
  type: Itype;
};

export enum TypeEnum {
  Api = 'api',
  Website = 'website',
}

export type Itype = 'api' | 'website';

/**
 * Dto
 */
export class buildProjectPostDto {
  @ApiProperty({
    description: 'git项目链接地址',
  })
  git_project_address: string;

  @ApiProperty({
    description: 'git项目名称',
  })
  git_project_name: string;

  @ApiProperty({
    description: '项目名称（英文）',
    example: 'nest',
  })
  project_name: string;

  @ApiProperty({
    description: 'ssl证书地址',
  })
  ssl_url: string;

  @ApiProperty({
    description: '项目的端口号',
    example: 3041,
  })
  port: number;

  @ApiProperty({
    enum: TypeEnum,
    description: '网站还是后台？',
    default: TypeEnum.Website,
  })
  type: Itype;
}
