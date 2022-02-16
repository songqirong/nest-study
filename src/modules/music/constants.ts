import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';

// export class CheckPhoneRegistDto {
//   @ApiProperty({ description: '要检测的手机号' })
//   phone: string;

//   @ApiPropertyOptional({
//     description: '国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国',
//     example: '86',
//   })
//   countrycode: string;
// }

export class LoginCommonDto {
  @ApiPropertyOptional({ description: '密码' })
  password: string;

  @ApiPropertyOptional({ description: 'md5 加密后的密码' })
  md5_password: string;

  @ApiPropertyOptional({ description: '手机短信验证码' })
  captcha: string;

  @ApiPropertyOptional({ description: '邮箱账号' })
  email: string;

  @ApiPropertyOptional({
    description: '国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国',
  })
  countrycode: string;

  @ApiPropertyOptional({
    description: '国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国',
  })
  ctcode: string;
}

class phoneDto {
  @ApiProperty({ description: '手机号' })
  phone: string;
}

class emailDto {
  @ApiProperty({ description: '邮箱账号' })
  email: string;
}

// 校验手机号
export class CheckPhoneRegistDto extends IntersectionType(
  phoneDto,
  PickType(LoginCommonDto, ['countrycode'] as const),
) {}

// 手机号登录
export class CellphoneLoginDto extends IntersectionType(
  phoneDto,
  OmitType(LoginCommonDto, ['email', 'ctcode'] as const),
) {}

// 邮箱登录
export class EmailLoginDto extends IntersectionType(
  emailDto,
  PickType(LoginCommonDto, ['password', 'md5_password'] as const),
) {}

// 获取验证码
export class CaptchaDto extends IntersectionType(
  phoneDto,
  PickType(LoginCommonDto, ['ctcode'] as const),
) {}

// 二维码生成
export class LoginQrCreateDto {
  @ApiProperty({ description: '由二维码key生成接口的key' })
  key: string;

  @ApiPropertyOptional({
    description: '传入后会额外返回二维码图片 base64 编码',
  })
  qrimg: string;
}

// 二维码检测扫码状态接口
export class LoginQrCheckDto extends PickType(LoginQrCreateDto, [
  'key',
] as const) {}

// 验证验证码
export class CaptchaVerifyDto {
  @ApiProperty({ description: '手机号' })
  phone: string;
  @ApiProperty({ description: '手机短信验证码' })
  captcha: string;
  @ApiPropertyOptional({
    description: '国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国',
  })
  ctcode: string;
}

// 注册或修改密码
export class RegisterCellphoneDTo {
  @ApiProperty({ description: '手机号' })
  phone: string;
  @ApiProperty({ description: '手机短信验证码' })
  captcha: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '昵称' })
  nickname: string;
  @ApiPropertyOptional({
    description: '国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国',
  })
  countrycode: string;
}

// 检测手机号是否已注册
export class ExistenceCheckDto extends PickType(RegisterCellphoneDTo, [
  'phone',
  'countrycode',
] as const) {}

// 初始化昵称
export class NicknameDto {
  @ApiProperty({ description: '昵称' })
  nickname: string;
}

// 更换绑定手机
export class RebindDto {
  @ApiProperty({ description: '手机号' })
  phone: string;
  @ApiProperty({ description: '手机短信验证码' })
  captcha: string;
  @ApiProperty({ description: '手机短信验证码' })
  oldcaptcha: string;
  @ApiPropertyOptional({
    description: '国家码，用于国外手机号，例如美国传入：1 ,默认 86 即中国',
  })
  ctcode: string;
}

// 获取用户详情
export class UidDto {
  @ApiProperty({ description: '用户id' })
  uid: string;
}
