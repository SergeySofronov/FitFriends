import { Expose } from 'class-transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';

export class LoggedUserRdo extends OmitType(UserRdo, ['name']) {
  @ApiProperty({
    description: 'User access token',
    example: 'eyJhbGciOiJIUzI1NiJ9...',
    required: true,
  })
  @Expose()
  public token: string;
}
