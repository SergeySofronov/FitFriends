export enum ReviewValidity {
  ContentMinLength = 10,
  ContentMaxLength = 140,
  RatingMinValue = 1,
  RatingMaxValue = 5,
}

export const ReviewQuery = {
  REVIEW_QUERY_MAX: 50,
  REVIEW_QUERY_MIN: 1,
  REVIEW_DEFAULT_PAGE: 1,
  REVIEW_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum ReviewSort {
  Date = 'date',
  Rating = 'rating'
}

export const ReviewSortField = {
  [ReviewSort.Date]: 'createdAt',
  [ReviewSort.Rating]: 'rating',
};


