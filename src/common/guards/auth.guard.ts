import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/guard/constants';
import { made_http_exception_obj } from 'src/utils/checkParam';
import { ROLES_KEY, IS_PUBLIC_KEY } from 'src/utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 健康检查或者访问根路径不需要鉴权
    const path: string = context.switchToHttp().getRequest().path;
    const isHealthCheck =
      (path as string).match(/health/)?.length > 0 || path === '/';
    if (isPublic || isHealthCheck) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    // 是否必须管理员才能打开
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(!user){
      made_http_exception_obj('登录信息已过期', 'user token has gone', HttpStatus.FORBIDDEN)
    }
    if (err || (roles && !roles.includes(user.role))) {
      throw (
        err ||
        made_http_exception_obj('用户权限不足', 'user Insufficient permissions')
      );
    }
    return user;
  }
}
