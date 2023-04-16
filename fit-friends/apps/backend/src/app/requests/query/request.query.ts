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

  @IsEnum(RequestCategory, { message: `${VM.IsEnumMessage} ${Object.values(RequestCategory).join(', ')}` })
  @IsOptional()
  public category?: RequestCategoryType;

  @IsEnum(RequestStatus, { message: `${VM.IsEnumMessage} ${Object.values(RequestStatus).join(', ')}` })
  @IsOptional()
  public status?: RequestStatusType
}
