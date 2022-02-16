import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 检测必传参数并抛出异常
 * @param obj
 */
export const check_param = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (!obj[key]) {
      made_http_exception_obj(`请求参数${key} 必传`, `${key} is required`);
    }
  }
};

/**
 *
 * @param obj 检测的属性集合对象
 * @param contact 联系关系
 */
export const check_param_contact = (
  obj: Record<string, any>,
  contact: 'conflict' | 'relyon' = 'relyon',
) => {
  if (contact === 'relyon') {
    let bol = false;
    // 检查是否有任何一个参数存在
    for (const key in obj) {
      if (obj[key]) bol = true;
    }
    // 有的话就继续检测
    if (bol) {
      check_param(obj);
    }
  } else {
    // 冲突属性的集合数组
    const arr = [];
    for (const key in obj) {
      obj[key] && arr.push([key]);
    }
    if (arr.length > 1) {
      const str = arr.join('、');
      made_http_exception_obj(
        `${str}等参数不能共存`,
        `${str} must not coexistence`,
      );
    }
  }
};

/**
 * 抛出异常
 * @param message 报错信息
 * @param error 报错
 * @param httpStatus 报错状态
 */
export const made_http_exception_obj = (
  message,
  error,
  httpStatus = HttpStatus.BAD_REQUEST,
) => {
  throw new HttpException(
    {
      message,
      error,
    },
    httpStatus,
  );
};

/**
 * 检验参数，省略结构的步骤
 * @param {Record<string, any>} obj
 * @param {string[]} arr
 */
export const check_param_obj = (obj: Record<string, any>, arr: string[]) => {
  const check_obj = {};
  for (const val of arr) {
    check_obj[val] = obj[val];
  }
  check_param(check_obj);
};
