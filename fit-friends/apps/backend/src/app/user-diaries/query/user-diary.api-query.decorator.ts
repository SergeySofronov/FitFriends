import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { UserDiarySort } from "../user-diary.constant";

export function ApiIndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: UserDiarySort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
    ApiQuery({ name: 'fromDate', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'beforeDate', description: '', required: false, type: () => Number }),
  );
}
