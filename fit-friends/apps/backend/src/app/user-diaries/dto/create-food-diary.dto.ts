import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber } from "class-validator";
import { ValidityMessage as VM } from '@fit-friends/core';
import { MealTime, MealTimeType } from "@fit-friends/shared-types";

export class CreateFoodDiaryDto {
 @ApiProperty({
    description: 'Сalorie intake',
    example: 1000,
    required: true,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public calories: number;

  @ApiProperty({
    description: "Meal time",
    example: MealTime.Breakfast,
    type: () => String,
    enum: MealTime,
    required: true,
  })
  @IsEnum(MealTime, { message: `${VM.IsEnumMessage} ${Object.values(MealTime).join(', ')}` })
  public mealTime: MealTimeType;

  @ApiProperty({
    description: "Date of meal",
    example: new Date().toISOString(),
    required: true,
  })
  @IsDateString()
  public date: Date;
}
