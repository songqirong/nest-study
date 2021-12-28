/**
 * 常量相关
 */

// 装饰器常量
export const IS_PUBLIC_KEY = 'is_public';

export const ROLES_KEY = 'roles_key';

// token相关常量
export const COOKIE_NAME = 'persion_token';

export const ACCESS_TOKEN_SECRET = 'access_token_secret';

/**
 * 类型、枚举相关
 */
export type ICookieConfigOptions = {
  httpOnly?: boolean;
  maxAge?: number;
  domain?: string;
  sameSite?: string;
  secure?: boolean;
  path?: string;
};
