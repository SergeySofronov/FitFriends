export enum UserDiaryValidity {
  DefaultQuantity = 0,
  IncreaseValue = 1,
}

export enum UserDiaryType {
  Food = 'Food',
  Training = 'Training',
}

export const UserDiaryQuery = {
  USER_DIARY_QUERY_MAX: 50,
  USER_DIARY_QUERY_MIN: 1,
  USER_DIARY_DEFAULT_PAGE: 1,
  USER_DIARY_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum UserDiarySort {
  Date = 'date',
}

export const UserDiarySortField = {
  [UserDiarySort.Date]: 'date',
};
