import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { GymSort } from "../gym.constant";
import { GymFeature, Location } from "@fit-friends/shared-types";

export function ApiIndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: GymSort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
    ApiQuery({ name: 'location', description: '', required: false, type: () => [Location], isArray: true }),
    ApiQuery({ name: 'priceMin', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'priceMax', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'isVerified', description: '', required: false, type: () => Boolean }),
    ApiQuery({ name: 'gymFeature', description: '', required: false, type: () => [GymFeature], isArray: true }),
  );
}
