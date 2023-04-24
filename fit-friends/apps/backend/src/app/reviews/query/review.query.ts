import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { ReviewQuery as RQ, ReviewSort } from '../review.constant';

export class ReviewQuery {
  @Transform(({ value }) => transformToMax(value, RQ.REVIEW_QUERY_MIN, RQ.REVIEW_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = RQ.REVIEW_DEFAULT_PAGE;

  @IsEnum(ReviewSort, { message: `${VM.IsEnumMessage} ${Object.values(ReviewSort).join(', ')}` })
  @IsOptional()
  public sortType?: ReviewSort = ReviewSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = RQ.REVIEW_DEFAULT_SORT_DIRECTION;
}
