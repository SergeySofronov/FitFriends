import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'User unique identifier',
    example: 1,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John Doe',
  })
  @Expose()
  public name: string;
}
