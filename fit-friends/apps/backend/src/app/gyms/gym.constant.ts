export enum GymValidity {
  PriceMinValue = 100,
  PriceMaxValue = 5000,
}

export const GymQuery = {
  GYM_QUERY_MAX: 50,
  GYM_QUERY_MIN: 1,
  DEFAULT_GYM_SORT_DIRECTION: 'desc',
} as const;

export enum GymSort {
  Date = 'date',
  Price = 'price'
}

export const GymSortField = {
  [GymSort.Date]: 'constructionDate',
  [GymSort.Price]: 'price',
};
