export enum GymValidity {
  PriceMinValue = 100,
  PriceMaxValue = 5000,
}

export const GymQuery = {
  GYM_QUERY_MAX: 50,
  GYM_QUERY_MIN: 1,
  GYM_DEFAULT_PAGE: 1,
  GYM_DEFAULT_SORT_DIRECTION: 'asc',
} as const;

export enum GymSort {
  Date = 'date',
  Price = 'price',
  Id = 'id'
}

export const GymSortField = {
  [GymSort.Date]: 'constructionDate',
  [GymSort.Price]: 'price',
  [GymSort.Id]: 'id',
};
