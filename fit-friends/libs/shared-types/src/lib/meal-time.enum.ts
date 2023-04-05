export enum MealTime {
  Breakfast = 'Breakfast',
  Dinner = 'Dinner',
  Lunch = 'Lunch',
  Snack = 'Snack',
}

export type MealTimeType = keyof typeof MealTime;
