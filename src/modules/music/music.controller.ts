import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import {
  playlist_hot,
  cellphone_existence_check,
  login_cellphone,
  login,
  captcha_sent,
  login_qr_key,
  login_qr_create,
  login_qr_check,
  login_refresh,
  captcha_verify,
  register_cellphone,
  activate_init_profile,
  rebind,
  logout,
  user_detail,
  user_account,
} from 'NeteaseCloudMusicApi';
import { Public } from 'src/common/decorators/public.decorator';
import {
  CaptchaDto,
  CaptchaVerifyDto,
  CellphoneLoginDto,
  CheckPhoneRegistDto,
  EmailLoginDto,
  ExistenceCheckDto,
  LoginQrCheckDto,
  LoginQrCreateDto,
  NicknameDto,
  RebindDto,
  RegisterCellphoneDTo,
  UidDto,
} from './constants';

@ApiTags('音乐接口相关')
@Controller('music')
@Public()
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  /**
   * 热门歌单分类
   * @param query
   * @returns
   */
  @Get('playlist/hot')
  async fetchPlaylistHot(@Query() query) {
    return await playlist_hot(query);
  }

  /**
   * 检测手机号是否已注册
   * @param {CheckPhoneRegistDto} query
   * @returns
   */
  @Get('check_phone')
  async fetchCheckPhone(@Query() query: CheckPhoneRegistDto) {
    return await cellphone_existence_check(query);
  }

  /**
   * 手机号码登录
   * @param {CellphoneLoginDto} body
   * @returns
   */
  @Post('login/cellphone')
  async fetchPhoneLogin(@Body() body: CellphoneLoginDto) {
    return await login_cellphone(body);
  }

  /**
   * 邮箱登录
   * @param {EmailLoginDto} body
   * @returns
   */
  @Post('login/email')
  async fetchEmailLogin(@Body() body: EmailLoginDto) {
    return await login(body);
  }

  /**
   * 获取手机验证码
   * @param {CaptchaDto} body
   * @returns
   */
  @Post('captcha/sent')
  async fetchCaptchaSend(@Body() body: CaptchaDto) {
    return await captcha_sent(body);
  }

  /**
   * 二维码key生成
   * @returns {String}
   */
  @Get('login/qr/key')
  async fetchQrKey() {
    return await login_qr_key({});
  }

  /**
   * 二维码生成接口
   * @param {LoginQrCreateDto} query
   * @returns
   */
  @Get('login/qr/create')
  async fetchQrCreate(@Query() query: LoginQrCreateDto) {
    return await login_qr_create(query);
  }

  /**
   * 二维码检测扫码状态接口
   * @param {LoginQrCheckDto} query
   * @returns
   */
  @Get('login/qr/check')
  async fetchQrCheck(@Query() query: LoginQrCheckDto) {
    return await login_qr_check(query);
  }

  /**
   * 刷新登录
   * @returns
   */
  @Patch('login/refresh')
  async fetchLoginRefresh() {
    return await login_refresh({});
  }

  /**
   * 验证验证码
   * @param {CaptchaVerifyDto} body
   * @returns
   */
  @Post('captcha/verify')
  async fetchCaptchaVerify(@Body() body: CaptchaVerifyDto) {
    return await captcha_verify(body);
  }

  /**
   * 注册(修改密码)
   * @param {RegisterCellphoneDTo} body
   * @returns
   */
  @Post('register/cellphone')
  async fetchRegisterCellphone(@Body() body: RegisterCellphoneDTo) {
    return await register_cellphone(body);
  }

  /**
   * 检测手机号码是否已注册
   * @param {ExistenceCheckDto} body
   * @returns
   */
  @Post('cellphone/existence/check')
  async fetchCellphoneCheck(@Body() body: ExistenceCheckDto) {
    return await cellphone_existence_check(body);
  }

  /**
   * 初始化昵称
   * @param {NicknameDto} body
   * @returns
   */
  @Post('activate/init/profile')
  async fetchInitNickname(@Body() body: NicknameDto) {
    return await activate_init_profile(body);
  }

  /**
   * 更换绑定手机
   * @param {RebindDto} body
   * @returns
   */
  @Post('rebind')
  async fetchRebind(@Body() body: RebindDto) {
    return await rebind(body);
  }

  /**
   * 退出登录
   * @returns
   */
  @Post('logout')
  async fetchLogout() {
    return await logout({});
  }

  /**
   * 获取用户详情
   * @param {UidDto} body
   * @returns
   */
  @Post('user/detail')
  async fetchUserDetail(@Body() body: UidDto) {
    return await user_detail(body);
  }

  /**
   * 获取账号信息
   * @returns
   */
  @Post('user/account')
  async fetchUserAccount() {
    return await user_account({});
  }
}
