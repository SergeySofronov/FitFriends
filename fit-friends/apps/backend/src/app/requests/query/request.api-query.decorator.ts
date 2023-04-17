import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { RequestSort } from "../request.constant";
import { RequestStatus } from "@fit-friends/shared-types";
import { RequestCategory } from "libs/shared-types/src/lib/request-category.enum";

export function ApiIndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: RequestSort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
    ApiQuery({ name: 'category', description: '', required: false, type: () => RequestCategory }),
    ApiQuery({ name: 'status', description: '', required: false, type: () => RequestStatus }),
    ApiQuery({ name: 'requesterId', description: '', required: false, type: () => Number }),
  );
}
