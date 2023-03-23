import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { TrainingQueryDefault as TQ, TrainingSort } from '../training.constant';

export class TrainingQuery {
  @Transform(({ value }) => (+value && (+value < TQ.DEFAULT_TRAINING_QUERY_LIMIT) ? +value : TQ.DEFAULT_TRAINING_QUERY_LIMIT))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(TrainingSort, { message: VM.IsEnumMessage })
  @IsOptional()
  public sortType?: TrainingSort = TrainingSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = TQ.DEFAULT_TRAINING_SORT_DIRECTION;
}
