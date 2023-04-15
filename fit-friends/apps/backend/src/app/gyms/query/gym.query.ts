import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { BooleanParamDecorator, transformToMax, transformToMin, ValidityMessage as VM } from '@fit-friends/core';
import { GymFeature, GymFeatureType, Location, LocationType } from '@fit-friends/shared-types';
import { GymQuery as GQ, GymSort, GymValidity as GV } from '../gym.constant';



export class GymQuery {
  @Transform(({ value }) => transformToMax(value, GQ.GYM_QUERY_MIN, GQ.GYM_QUERY_MAX))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(GymSort, { message: `${VM.IsEnumMessage} ${Object.values(GymSort).join(', ')}` })
  @IsOptional()
  public sortType?: GymSort = GymSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = GQ.DEFAULT_GYM_SORT_DIRECTION;

  @IsNumber()
  @Transform(({ value }) => transformToMin(value, GV.PriceMinValue, GV.PriceMaxValue))
  @IsOptional()
  public priceMin?: number;

  @IsNumber()
  @Transform(({ value }) => transformToMax(value, GV.PriceMinValue, GV.PriceMaxValue))
  @IsOptional()
  public priceMax?: number;

  @IsIn([...Object.values(Location)], { message: `${VM.IsInEnumMessage} ${Object.values(Location).join(', ')}` })
  @IsOptional()
  public location?: LocationType;

  @IsIn([...Object.values(GymFeature)], { message: `${VM.IsEnumMessage} ${Object.values(GymFeature).join(', ')}` })
  @IsOptional()
  public gymFeature?: GymFeatureType[];

  @BooleanParamDecorator({ message: `${VM.IsBoolean} ${Object.values(GymFeature).join(', ')}` })
  @IsOptional()
  public isVerified?: boolean = false;
}

