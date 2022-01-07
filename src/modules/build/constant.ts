import { ApiProperty } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { pwd } from 'shelljs';
const is_dev = process.env.CURRENT_ENV === 'development';
export const services: IService[] = JSON.parse(
  readFileSync(
    pwd() +
      `/dist/static/build/template/${
        is_dev ? 'local.constant.json' : 'constant.json'
      }`,
    'utf-8',
  ),
).services;
function getServicesEnum() {
  const obj = {};
  services.map((item) => {
    obj[item.project_name.toUpperCase()] = item.project_name;
  });
  return obj;
}

/**
 * 类型
 */
export type IService = {
  port: number;
  project_name: string;
  type: Itype;
  git_project_address: string;
  git_project_name: string;
  ssl_url: string;
};

export enum TypeEnum {
  Api = 'api',
  Website = 'website',
}

export const ServicesEnum = getServicesEnum();

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

export class updateProjectDto {
  @ApiProperty({
    description: '更新的项目',
    enum: ServicesEnum,
    default: 'shop',
  })
  project: string;
}
