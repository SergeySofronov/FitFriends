import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, transformToMin, ValidityMessage as VM } from '@fit-friends/core';
import { TrainingTime, TrainingTimeType } from '@fit-friends/shared-types';
import { TrainingQuery as TQ, TrainingSort, TrainingValidity as TV } from '../training.constant';



export class TrainingQuery {
  @Transform(({ value }) => transformToMax(value, TQ.TRAINING_QUERY_MIN, TQ.TRAINING_QUERY_MAX))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(TrainingSort, { message: `${VM.IsEnumMessage} ${Object.values(TrainingSort).join(', ')}` })
  @IsOptional()
  public sortType?: TrainingSort = TrainingSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = TQ.DEFAULT_TRAINING_SORT_DIRECTION;

  @IsNumber()
  @Transform(({ value }) => transformToMin(value, TV.PriceMinValue, TV.PriceMaxValue))
  @IsOptional()
  public priceMin?: number;

  @IsNumber()
  @Transform(({ value }) => transformToMax(value, TV.PriceMinValue, TV.PriceMaxValue))
  @IsOptional()
  public priceMax?: number;

  @IsNumber()
  @Transform(({ value }) => transformToMin(value, TV.RatingMinValue, TV.RatingMaxValue))
  @IsOptional()
  public ratingMin?: number;

  @IsNumber()
  @Transform(({ value }) => transformToMax(value, TV.RatingMinValue, TV.RatingMaxValue))
  @IsOptional()
  public ratingMax?: number;

  @IsEnum(TrainingTime, { message: `${VM.IsEnumMessage} ${Object.values(TrainingTime).join(', ')}` })
  @IsOptional()
  public trainingTime?: TrainingTimeType;
}
