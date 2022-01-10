import { ICookieConfigOptions, COOKIE_NAME } from './constants';

/**
 * 解析cookies
 * @param cookies
 * @returns
 */
export const cookiesParse = (cookies: string) => {
  const obj = {};
  if (!cookies) return;
  cookies.split('; ').map((item) => {
    const [key, value] = item.split('=');
    obj[key] = value;
  });
  return Reflect.get(obj, COOKIE_NAME);
};

export const is_dev = process.env.CURRENT_ENV === 'development';

/**
 * 设置cookie
 * @param key 赋值名称
 * @param value 赋值值
 * @param configOptions 赋值配置项
 * @returns
 */
export const getCookieValue = (
  key: string,
  value: string,
  configOptions: ICookieConfigOptions = {},
): string => {
  let str = `${key}=${value};`;
  for (const key in configOptions) {
    str += `${key}=${configOptions[key]};`;
  }
  return str;
};

/**
 * 数据库查询的数据过滤
 * @param obj 要过滤的对象
 * @returns 过滤后的对象
 */
export const filterFindObj = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      (item) => item[1] !== undefined && item[1] !== '',
    ),
  );
