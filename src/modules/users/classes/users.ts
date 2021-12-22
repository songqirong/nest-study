import { ApiProperty } from '@nestjs/swagger';

/**
 * 接口、枚举、类型相关
 */

export interface Photo {
  id: number;
  url: string;
}

export enum IStatus {
  true,
  false,
}

export interface ICreateUserInfo {
  username: string;
  password: string;
  status: boolean;
}

/**
 * 获取所有用户信息
 */
export class PhotoDto {
  @ApiProperty({
    description: '相片id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '相片地址',
    example:
      'https://walker-markdown.oss-cn-shenzhen.aliyuncs.com/uPic/XhoY7p.png',
  })
  url: string;
}

export class GetUsersAllResponse {
  @ApiProperty({
    description: 'id',
    example: 1234,
  })
  id: number;

  @ApiProperty({
    description: '用户名称',
    example: 'lixin',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: '用户状态',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: '用户照片',
    type: [PhotoDto],
  })
  photos: Photo[];
}

/**
 * 创建用户
 */
export class createUserProperty {
  @ApiProperty({
    description: '用户名称',
    example: 'lixin',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    example: 'password',
  })
  password: string;

  @ApiProperty({
    description: '用户状态',
    example: true,
  })
  status: boolean;
}

/**
 * 批量创建用户
 */
// export class createManyUserProperty {
//   @ApiProperty({
//     description: '添加的所有用户',
//     example: [
//       {
//         username: 'username',
//         password: 'password',
//         status: true,
//       },
//     ],
//     type: [createUserProperty],
//   })
//   users: ICreateUserInfo[];
// }
