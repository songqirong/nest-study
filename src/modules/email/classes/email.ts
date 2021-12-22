import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmailPost {
  @ApiProperty({
    example: 'songqirong912@163.com',
    description: '发送至的email账号',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '用户邮箱验证',
    description: '邮件标题',
    required: false,
  })
  subject: string;

  @ApiProperty({
    example: '系统邮件，回复无效',
    description: '邮件签名',
    required: false,
  })
  sign: string;
}
