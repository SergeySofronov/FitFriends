import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, Max, MaxLength, Min, MinLength } from 'class-validator';
import { IsBooleanProp, ValidityMessage as VM } from '@fit-friends/core';
import { TrainingValidity as TV } from '../training.constant';
import { TrainingStyle, TrainingStyleType, TrainingTime, TrainingTimeType, UserGender, UserGenderType, UserLevel, UserLevelType } from '@fit-friends/shared-types';

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'Run, Forest, run',
    minLength: TV.TitleMinLength,
    maxLength: TV.TitleMaxLength,
    required: true,
  })
  @MinLength(TV.TitleMinLength, { message: VM.MinValueMessage })
  @MaxLength(TV.TitleMaxLength, { message: VM.MaxValueMessage })
  @Transform(({ value }) => value instanceof String ? value.replace(/\s{2,}/g, ' ').trim() : value)
  public title: string;

  @ApiProperty({
    description: "User's training level",
    example: UserLevel.Beginner,
    type: () => String,
    enum: UserLevel,
    required: true,
  })
  @IsEnum(UserLevel, { message: `${VM.IsEnumMessage} ${Object.values(UserLevel).join(', ')}` })
  public level: UserLevelType;

  @ApiProperty({
    description: "Trining style",
    example: TrainingStyle.Aerobics,
    type: () => String,
    enum: TrainingStyle,
    required: true,
  })
  @IsEnum(TrainingStyle, { message: `${VM.IsEnumMessage} ${Object.values(TrainingStyle).join(', ')}` })
  public trainingStyle: TrainingStyleType;

  @ApiProperty({
    description: "Estimated training time",
    example: TrainingTime.Max30,
    type: () => String,
    enum: TrainingTime,
    required: true,
  })
  @IsEnum(TrainingTime, { message: `${VM.IsEnumMessage} ${Object.values(TrainingTime).join(', ')}` })
  trainingTime: TrainingTimeType;

  @ApiProperty({
    description: 'The price of training',
    example: TV.PriceMinValue,
    minimum: TV.PriceMinValue,
    maximum: TV.PriceMaxValue,
    required: true,
  })
  @Min(TV.PriceMinValue, { message: VM.MinValueMessage })
  @Max(TV.PriceMaxValue, { message: VM.MaxValueMessage })
  public price: number;

  @ApiProperty({
    description: 'Еhe number of calories consumed during a workout',
    example: TV.CaloriesLossMinValue,
    minimum: TV.CaloriesLossMinValue,
    maximum: TV.CaloriesLossMaxValue,
    required: true,
  })
  @Min(TV.CaloriesLossMinValue, { message: VM.MinValueMessage })
  @Max(TV.CaloriesLossMaxValue, { message: VM.MaxValueMessage })
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Training description',
    example: 'A complex set of exercises for professional athletes to work out indicators in the classical style',
    minLength: TV.DescriptionMinLength,
    maxLength: TV.DescriptionMaxLength,
    required: true,
  })
  @MinLength(TV.DescriptionMinLength, { message: VM.MinValueMessage })
  @MaxLength(TV.DescriptionMaxLength, { message: VM.MaxValueMessage })
  @Transform(({ value }) => value instanceof String ? value.replace(/\s{2,}/g, ' ').trim() : value)
  public description: string;

  @ApiProperty({
    description: "User's gender",
    example: UserGender.Male,
    type: () => String,
    enum: UserGender,
    required: true,
  })
  @IsEnum(UserGender, { message: `${VM.IsEnumMessage} ${Object.values(UserGender).join(', ')}` })
  public gender: UserGenderType;

  @ApiProperty({
    description: "The flag defines the participation of the training as a special offer",
    example: true,
    required: true,
  })
  @IsBooleanProp({ message: VM.IsBoolean })
  public isSpecial: boolean;
}
