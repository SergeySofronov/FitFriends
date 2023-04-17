import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { RequestQuery as RQ, RequestSort } from '../request.constant';
import { RequestCategory, RequestCategoryType } from 'libs/shared-types/src/lib/request-category.enum';
import { RequestStatus, RequestStatusType } from '@fit-friends/shared-types';


export class RequestQuery {
  @Transform(({ value }) => transformToMax(value, RQ.REQUEST_QUERY_MIN, RQ.REQUEST_QUERY_MAX))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number = RQ.REQUEST_DEFAULT_PAGE;

  @IsEnum(RequestSort, { message: `${VM.IsEnumMessage} ${Object.values(RequestSort).join(', ')}` })
  @IsOptional()
  public sortType?: RequestSort = RequestSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = RQ.REQUEST_DEFAULT_SORT_DIRECTION;

  @IsIn(Object.values(RequestCategory), { message: `${VM.IsInEnumMessage} ${Object.values(RequestCategory).join(', ')}`, each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public category?: RequestCategoryType;

  @IsIn(Object.values(RequestStatus), { message: `${VM.IsInEnumMessage} ${Object.values(RequestStatus).join(', ')}`, each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public status?: RequestStatusType

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  requesterId?: number;
}
