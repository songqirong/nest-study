import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedDto } from '../classes/responseType';

export const ResponseDec = (type?: any) =>
  applyDecorators(
    ApiOkResponse({ description: '请求成功', type }),
    ApiBadRequestResponse({ description: '传参有误' }),
    ApiForbiddenResponse({ description: '当前账户没有权限' }),
    ApiNotFoundResponse({ description: '当前服务没有找到' }),
    ApiInternalServerErrorResponse({ description: '服务器异常' }),
  );

export const ApiPaginatedResponse = <Tmodel extends Type<any>>(
  model: Tmodel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      description: '请求成功',
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(model),
                },
              },
            },
          },
        ],
      },
    }),
    ApiBadRequestResponse({ description: '传参有误' }),
    ApiForbiddenResponse({ description: '当前账户没有权限' }),
    ApiNotFoundResponse({ description: '当前服务没有找到' }),
    ApiInternalServerErrorResponse({ description: '服务器异常' }),
  );
};
