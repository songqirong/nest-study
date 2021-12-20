import { HttpException, HttpStatus } from '@nestjs/common';

export const made_http_exception = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (!obj[key]) {
      throw new HttpException(
        {
          message: `请求参数${key} 必传`,
          error: `${key} is required`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
};

export const made_http_exception_obj = ({ httpStatus, message, error }) => {
  throw new HttpException(
    {
      message,
      error,
    },
    httpStatus,
  );
};
