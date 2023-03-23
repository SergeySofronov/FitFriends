export enum TrainingValidity {
  TitleMinLength = 1,
  TitleMaxLength = 15,
  PriceMinValue = 0,
  PriceMaxValue = 1000000,
  CaloriesLossMinValue = 1000,
  CaloriesLossMaxValue = 5000,
  DescriptionMinLength = 10,
  DescriptionMaxLength = 140,
  DefaultRating = 0,
}

export const TrainingQueryDefault = {
  DEFAULT_TRAINING_QUERY_LIMIT: 50,
  DEFAULT_TRAINING_SORT_DIRECTION: 'desc',
} as const;

export enum TrainingSort {
  Date = 'date',
}

export const TrainingSortField = {
  [TrainingSort.Date]: 'createdAt',
};


