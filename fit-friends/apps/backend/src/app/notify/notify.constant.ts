export const NotifyQuery = {
  NOTIFY_QUERY_MAX: 50,
  NOTIFY_QUERY_MIN: 1,
  NOTIFY_DEFAULT_PAGE: 1,
  NOTIFY_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum NotifySort {
  Date = 'date',
}

export const NotifySortField = {
  [NotifySort.Date]: 'createdAt',
};


