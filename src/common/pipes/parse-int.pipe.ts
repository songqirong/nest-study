import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
/**
 * 模拟实现ParseInitPipe
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
