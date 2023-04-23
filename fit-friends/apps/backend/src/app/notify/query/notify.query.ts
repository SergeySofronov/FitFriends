import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { BooleanParamDecorator, transformStringToBool, transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { NotifyQuery as NQ, NotifySort } from '../notify.constant';


export class NotifyQuery {
  @Transform(({ value }) => transformToMax(value, NQ.NOTIFY_QUERY_MIN, NQ.NOTIFY_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = NQ.NOTIFY_DEFAULT_PAGE;

  @IsEnum(NotifySort, { message: `${VM.IsEnumMessage} ${Object.values(NotifySort).join(', ')}` })
  @IsOptional()
  public sortType?: NotifySort = NotifySort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = NQ.NOTIFY_DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => transformStringToBool(value))
  @BooleanParamDecorator({ message: VM.IsBoolean })
  @IsOptional()
  public isChecked?: boolean;
}
