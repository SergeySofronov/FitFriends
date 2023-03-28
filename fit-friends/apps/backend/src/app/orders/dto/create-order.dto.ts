import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, Max, MaxLength, Min, MinLength } from 'class-validator';
import { BooleanParamDecorator, ValidityMessage as VM } from '@fit-friends/core';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order title',
    example: 'Run, Forest, run',
    minLength: OV.TitleMinLength,
    maxLength: OV.TitleMaxLength,
    required: true,
  })
  @MinLength(OV.TitleMinLength, { message: VM.MinValueMessage })
  @MaxLength(OV.TitleMaxLength, { message: VM.MaxValueMessage })
  @Transform(({ value }) => value instanceof String ? value.replace(/\s{2,}/g, ' ').trim() : value)
  public title: string;

  @ApiProperty({
    description: "User's order level",
    example: UserLevel.Beginner,
    type: () => String,
    enum: UserLevel,
    required: true,
  })
  @IsEnum(UserLevel, { message: `${VM.IsEnumMessage} ${Object.values(UserLevel).join(', ')}` })
  public level: UserLevelType;

  @ApiProperty({
    description: "Trining style",
    example: OrderStyle.Aerobics,
    type: () => String,
    enum: OrderStyle,
    required: true,
  })
  @IsEnum(OrderStyle, { message: `${VM.IsEnumMessage} ${Object.values(OrderStyle).join(', ')}` })
  public orderStyle: OrderStyleType;

  @ApiProperty({
    description: "Estimated order time",
    example: OrderTime.Max30,
    type: () => String,
    enum: OrderTime,
    required: true,
  })
  @IsEnum(OrderTime, { message: `${VM.IsEnumMessage} ${Object.values(OrderTime).join(', ')}` })
  orderTime: OrderTimeType;

  @ApiProperty({
    description: 'The price of order',
    example: OV.PriceMinValue,
    minimum: OV.PriceMinValue,
    maximum: OV.PriceMaxValue,
    required: true,
  })
  @Min(OV.PriceMinValue, { message: VM.MinValueMessage })
  @Max(OV.PriceMaxValue, { message: VM.MaxValueMessage })
  public price: number;

  @ApiProperty({
    description: 'Еhe number of calories consumed during a workout',
    example: OV.CaloriesLossMinValue,
    minimum: OV.CaloriesLossMinValue,
    maximum: OV.CaloriesLossMaxValue,
    required: true,
  })
  @Min(OV.CaloriesLossMinValue, { message: VM.MinValueMessage })
  @Max(OV.CaloriesLossMaxValue, { message: VM.MaxValueMessage })
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Order description',
    example: 'A complex set of exercises for professional athletes to work out indicators in the classical style',
    minLength: OV.DescriptionMinLength,
    maxLength: OV.DescriptionMaxLength,
    required: true,
  })
  @MinLength(OV.DescriptionMinLength, { message: VM.MinValueMessage })
  @MaxLength(OV.DescriptionMaxLength, { message: VM.MaxValueMessage })
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
    description: "The flag defines the participation of the order as a special offer",
    example: true,
    required: true,
  })
  @BooleanParamDecorator({ message: VM.isBoolean })
  public isSpecial: boolean;
}
