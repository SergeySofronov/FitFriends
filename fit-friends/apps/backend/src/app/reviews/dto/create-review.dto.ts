import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Max, MaxLength, Min, MinLength } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { ReviewValidity as RV } from '../review.constant';

export class CreateReviewDto {
  @ApiProperty({
    description: 'User rating',
    example: RV.RatingMinValue,
    minimum: RV.RatingMinValue,
    maximum: RV.RatingMaxValue,
    required: true,
  })
  @Min(RV.RatingMinValue, { message: VM.MinValueMessage })
  @Max(RV.RatingMaxValue, { message: VM.MaxValueMessage })
  public rating: number;

  @ApiProperty({
    description: 'Review content',
    example: 'A good workout, but still lacked a bit of dynamics. It turned out to be too easy for me',
    minLength: RV.ContentMinLength,
    maxLength: RV.ContentMaxLength,
    required: true,
  })
  @MinLength(RV.ContentMinLength, { message: VM.MinValueMessage })
  @MaxLength(RV.ContentMaxLength, { message: VM.MaxValueMessage })
  @Transform(({ value }) => value instanceof String ? value.replace(/\s{2,}/g, ' ').trim() : value)
  public content: string;
}
