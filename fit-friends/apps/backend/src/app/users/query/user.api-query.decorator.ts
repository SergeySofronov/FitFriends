import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { UserSort } from "../user.constant";

export function ApiIndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: UserSort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
  );
}
