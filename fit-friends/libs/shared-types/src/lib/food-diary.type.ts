import { MealTimeType } from "./meal-time.enum";

export type FoodDiary = {
  id?: number;
  userId: number;
  calories: number;
  mealTime: MealTimeType;
  date?: Date;
}
