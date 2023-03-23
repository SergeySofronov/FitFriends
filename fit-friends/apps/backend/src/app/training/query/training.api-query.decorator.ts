import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { TrainingSort } from "../training.constant";

export function ApiIndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: TrainingSort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
  );
}
