export enum TrainingValidity {
  TitleMinLength = 1,
  TitleMaxLength = 15,
  PriceMinValue = 0,
  PriceMaxValue = 1000000,
  CaloriesLossMinValue = 1000,
  CaloriesLossMaxValue = 5000,
  DescriptionMinLength = 10,
  DescriptionMaxLength = 140,
  RatingMinValue = 1,
  RatingMaxValue = 5,
  ReviewsMinQuantity = 0,
}

export const TrainingQuery = {
  TRAINING_QUERY_MAX: 50,
  TRAINING_QUERY_MIN: 1,
  TRAINING_DEFAULT_PAGE: 1,
  TRAINING_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum TrainingSort {
  Date = 'date',
  Price = 'price'
}

export const TrainingSortField = {
  [TrainingSort.Date]: 'createdAt',
  [TrainingSort.Price]: 'price',
};


