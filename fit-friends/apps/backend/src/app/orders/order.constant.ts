export const OrderQuery = {
  ORDER_QUERY_MAX: 50,
  ORDER_QUERY_MIN: 1,
  DEFAULT_ORDER_SORT_DIRECTION: 'desc',
} as const;

export enum OrderSort {
  Quantity = 'quantity',
  Price = 'price'
}

export const OrderSortField = {
  [OrderSort.Quantity]: 'quantity',
  [OrderSort.Price]: 'price',
};


