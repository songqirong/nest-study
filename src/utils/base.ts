import { ICookieConfigOptions, COOKIE_NAME } from './constants';

/**
 * 解析cookies
 * @param cookies
 * @returns
 */
export const cookiesParse = (cookies: string) => {
  const obj = {};
  cookies.split('; ').map((item) => {
    const [key, value] = item.split('=');
    obj[key] = value;
  });
  return Reflect.get(obj, COOKIE_NAME);
};

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
