import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { UserQuery as UQ, UserSort } from '../user.constant';

export class UserQuery {
  @Transform(({ value }) => transformToMax(value, UQ.USER_QUERY_MIN, UQ.USER_QUERY_MAX))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number = UQ.USER_DEFAULT_PAGE;

  @IsEnum(UserSort, { message: `${VM.IsEnumMessage} ${Object.values(UserSort).join(', ')}` })
  @IsOptional()
  public sortType?: UserSort = UserSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = UQ.USER_DEFAULT_SORT_DIRECTION;
}
