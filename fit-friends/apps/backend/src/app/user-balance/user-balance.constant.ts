export enum UserBalanceValidity {
  DefaultQuantity = 0,
  IncreaseValue = 1,
}

export const UserBalanceQuery = {
  USER_BALANCE_QUERY_MAX: 50,
  USER_BALANCE_QUERY_MIN: 1,
  USER_BALANCE_DEFAULT_PAGE: 1,
  USER_BALANCE_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum UserBalanceSort {
  Date = 'date',
  Price = 'price',
  Id = 'id'
}

export const UserBalanceSortField = {
  [UserBalanceSort.Date]: 'updatedAt',
  [UserBalanceSort.Price]: 'price',
  [UserBalanceSort.Id]: 'id',
};
