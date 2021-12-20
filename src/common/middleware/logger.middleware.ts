import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, request } from 'express';

/**
 * 日志管理 应用中间件
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * 功能中间件：当您的中间件不需要任何依赖项时，请考虑使用更简单的功能中间件替代方案
 */
export const LoggerMiddlewareFun = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { method, path } = req;
  console.log(`${method} ${path}`);
  next();
};

export class LoggerMiddlewareNoImplements {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path } = req;
    console.log(`${method} ${path}`);
    next();
  }
}
