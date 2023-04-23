import { Injectable } from '@nestjs/common'
import { FoodDiary, MealTimeType } from '@fit-friends/shared-types'
import { Entity } from '@fit-friends/core';

@Injectable()
export class FoodDiaryEntity implements Entity<FoodDiaryEntity, FoodDiary>, FoodDiary {
  public id?: number;
  public userId: number;
  public calories: number;
  public mealTime: MealTimeType;
  public date?: Date;

  constructor(diary: FoodDiary) {
    this.fillEntity(diary);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(diary: FoodDiary) {
    this.id = diary.id;
    this.userId = diary.userId;
    this.calories = diary.calories;
    this.mealTime = diary.mealTime;
    this.date = diary.date || new Date();
  }
}
