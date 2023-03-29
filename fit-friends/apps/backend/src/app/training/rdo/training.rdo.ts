import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { TrainingValidity as TV } from '../training.constant';
import { TrainingStyle, TrainingStyleType, TrainingTime, TrainingTimeType, UserGender, UserGenderType, UserLevel, UserLevelType } from '@fit-friends/shared-types';

export class TrainingRdo {
  @ApiProperty({
    description: 'Training unique identifier',
    example: 1,
  })
  @Expose()

  public id: string;
  @ApiProperty({
    description: 'Training title',
    example: 'Run, Forest, run',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Training background image',
    example: 'training-1.png',
  })
  @Expose()
  public backgroundImage: string;

  @ApiProperty({
    description: "User's training level",
    example: UserLevel.Beginner,
  })
  @Expose()
  public level: UserLevelType;

  @ApiProperty({
    description: "Trining style",
    example: TrainingStyle.Aerobics,
  })
  @Expose()
  public trainingStyle: TrainingStyleType;

  @ApiProperty({
    description: "Estimated training time",
    example: TrainingTime.Max30,
  })
  @Expose()
  trainingTime: TrainingTimeType;

  @ApiProperty({
    description: 'The price of training',
    example: TV.PriceMinValue,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Еhe number of calories consumed during a workout',
    example: TV.CaloriesLossMinValue,
  })
  @Expose()
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Training description',
    example: 'A complex set of exercises for professional athletes to work out indicators in the classical style',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: "User's gender",
    example: UserGender.Male,
  })
  @Expose()
  public gender: UserGenderType;

  @ApiProperty({
    description: 'Training video link',
    example: '/folder/file.mp4',
  })
  @Expose()
  public video: string;

  @ApiProperty({
    description: 'User rating of the workout',
    example: TV.RatingMinValue,
  })
  @Expose()
  public rating: number;


  @ApiProperty({
    description: 'Coach unique identifier',
    example: 1,
  })
  @Expose()
  public coachId: number;

  @ApiProperty({
    description: "The flag defines the participation of the training as a special offer",
    example: true,
  })
  @Expose()
  public isSpecial: boolean;

  @ApiProperty({
    description: 'Date of creation of the training',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of update of the training',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public updatedAt: string;
}
