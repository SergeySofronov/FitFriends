import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { MealTimeType, MealTime } from '@fit-friends/shared-types';

export class FoodDiaryRdo {
  @ApiProperty({
    description: 'Diary unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Calorie intake',
    example: 1,
  })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Meal time',
    example: 1,
    enum: MealTime,
  })
  @Expose()
  public mealTime: MealTimeType;

  @ApiProperty({
    description: 'Date of update of the user account',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public date: string;
}
