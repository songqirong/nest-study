import { ApiProperty } from '@nestjs/swagger';

export class OkDefaultType {
  @ApiProperty({
    example: true,
  })
  true;
}
