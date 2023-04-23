import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { UserBalanceQuery as BQ, UserBalanceSort } from '../user-balance.constant';


export class UserBalanceQuery {
  @Transform(({ value }) => transformToMax(value, BQ.USER_BALANCE_QUERY_MIN, BQ.USER_BALANCE_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = BQ.USER_BALANCE_DEFAULT_PAGE;

  @IsEnum(UserBalanceSort, { message: `${VM.IsEnumMessage} ${Object.values(UserBalanceSort).join(', ')}` })
  @IsOptional()
  public sortType?: UserBalanceSort = UserBalanceSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = BQ.USER_BALANCE_DEFAULT_SORT_DIRECTION;
}

