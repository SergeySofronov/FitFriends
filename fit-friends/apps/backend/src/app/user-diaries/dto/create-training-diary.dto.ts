import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTrainingDiaryDto {
  @ApiProperty({
    description: 'Training unique identifier',
    example: 1,
    required: true,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public trainingId: number;
}
