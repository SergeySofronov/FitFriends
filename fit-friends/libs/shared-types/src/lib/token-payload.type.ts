import { UserRole, UserRoleType } from "./user-role.enum";
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer';

export class TokenPayload {
  @ApiProperty({
    description: 'User unique identifier',
    example: 1,
  })
  @Expose()
  public sub: number;

  @ApiProperty({
    description: 'User name',
    example: 'user',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
    enum: UserRole,
  })
  @Expose()
  public role: UserRoleType;
}
