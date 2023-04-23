import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { BooleanParamDecorator, transformStringToBool, transformToMax, transformToMin, ValidityMessage as VM } from '@fit-friends/core';
import { GymFeature, GymFeatureType, Location, LocationType } from '@fit-friends/shared-types';
import { GymQuery as GQ, GymSort, GymValidity as GV } from '../gym.constant';


export class GymQuery {
  @Transform(({ value }) => transformToMax(value, GQ.GYM_QUERY_MIN, GQ.GYM_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = GQ.GYM_DEFAULT_PAGE;

  @IsEnum(GymSort, { message: `${VM.IsEnumMessage} ${Object.values(GymSort).join(', ')}` })
  @IsOptional()
  public sortType?: GymSort = GymSort.Id;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = GQ.GYM_DEFAULT_SORT_DIRECTION;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Transform(({ value }) => transformToMin(value, GV.PriceMinValue, GV.PriceMaxValue))
  @IsOptional()
  public priceMin?: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Transform(({ value }) => transformToMax(value, GV.PriceMinValue, GV.PriceMaxValue))
  @IsOptional()
  public priceMax?: number;

  @IsIn(Object.values(Location), { message: `${VM.IsInEnumMessage} ${Object.values(Location).join(', ')}`, each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public location?: LocationType;

  @IsIn(Object.values(GymFeature), { message: `${VM.IsEnumMessage} ${Object.values(GymFeature).join(', ')}`, each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public gymFeature?: GymFeatureType[];

  @Transform(({ value }) => transformStringToBool(value))
  @BooleanParamDecorator({ message: VM.IsBoolean })
  @IsOptional()
  public isVerified?: boolean;

  @Transform(({ value }) => transformStringToBool(value))
  @BooleanParamDecorator({ message: VM.IsBoolean })
  public isFavorite: boolean;
}

