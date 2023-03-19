import { ApiProperty } from "@nestjs/swagger";
import { TrainingTime, TrainingTimeType } from "@fit-friends/shared-types";
import { UserValidity as UV } from '../user.constant';
import { Expose } from "class-transformer";

export class FeaturesRdo {
  @ApiProperty({
    description: "User's trining style",
    example: `${TrainingTime.Max30}`,
    type: () => String,
    enum: TrainingTime,

  })
  @Expose()
  trainingTime: TrainingTimeType;

  @ApiProperty({
    description: 'Number of calories to lose',
    minimum: UV.CaloriesLossMinValue,
    maximum: UV.CaloriesLossMaxValue,

  })
  @Expose()
  caloriesLoss: number;

  @ApiProperty({
    description: 'Number of calories to lose per day',
    minimum: UV.CaloriesLossPerDayMinValue,
    maximum: UV.CaloriesLossPerDayMaxValue,

  })
  caloriesLossPerDay: number;

  @ApiProperty({
    description: "Flag of the user's readiness for training invitations",
    example: true,

  })
  @Expose()
  isReadyForTraining: boolean;

  @ApiProperty({
    description: "Trainer's certificate, link to pdf file",
    example: 'certificate.pdf',
    minLength: UV.CertificateMinLength,
    maxLength: UV.CertificateMaxLength,
  })
  @Expose()
  certificate: string;

  @ApiProperty({
    description: 'Text describing the merits of the coach',
    example: 'Master of sports in boxing',
    minLength: UV.MeritsMinLength,
    maxLength: UV.MeritsMaxLength,
  })
  @Expose()
  merits: string;

  @ApiProperty({
    description: 'Flag of readiness to conduct individual training',
    example: true,
  })
  @Expose()
  isPersonalCoach: boolean;
}

