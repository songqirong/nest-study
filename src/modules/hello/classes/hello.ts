import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export class HelloPost {
  @ApiProperty({
    example: 'Kitty',
    description: 'The message what are you want',
  })
  message: string;
}

export class HelloPatch {
  @ApiProperty({
    example: 'Kitty',
    description: 'The message what are you want',
  })
  message: string;
  @ApiProperty({ example: 1, description: 'id' })
  id: number;
}

// export class HelloResponse{

// }
