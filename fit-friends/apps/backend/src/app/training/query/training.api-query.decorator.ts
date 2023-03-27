import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { TrainingSort } from "../training.constant";
import { TrainingTime } from "@fit-friends/shared-types";

export function ApiIndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: TrainingSort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
    ApiQuery({ name: 'priceMin', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'priceMax', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'ratingMin', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'ratingMax', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'trainingTime', description: '', required: false, type: () => TrainingTime }),
  );
}
