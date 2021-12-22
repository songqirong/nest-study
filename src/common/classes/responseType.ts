import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty({
    description: '查询总条数',
  })
  total: number;

  @ApiProperty({
    description: '条数',
  })
  limit: number;

  @ApiProperty({
    description: '跳过的条数',
  })
  offset: number;

  @ApiProperty({
    description: '查询列表',
  })
  results: TData[];
}
