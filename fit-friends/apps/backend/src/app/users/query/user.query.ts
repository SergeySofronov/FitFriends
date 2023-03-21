import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { UserQueryDefault as UQ, UserSort } from '../user.constant';

export class UserQuery {
  @Transform(({ value }) => +value || UQ.EFAULT_USER_QUERY_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(UserSort, { message: VM.IsEnumMessage })
  @IsOptional()
  public sortType?: UserSort = UserSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = UQ.DEFAULT_USER_SORT_DIRECTION;
}
