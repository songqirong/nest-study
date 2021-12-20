import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

export const ResponseDec = (type?: any) =>
  applyDecorators(
    ApiOkResponse({ description: 'Ok', type }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiForbiddenResponse({ description: 'Forbidden' }),
    ApiNotFoundResponse({ description: 'Server is not found' }),
  );
