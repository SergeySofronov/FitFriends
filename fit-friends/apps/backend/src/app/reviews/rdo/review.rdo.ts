import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { UserRdo } from '../../users/rdo/user.rdo';

export class ReviewRdo {
  @ApiProperty({
    description: 'Review unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Training unique identifier',
    example: 1,
  })
  @Expose()
  public trainingId: number;

  @ApiProperty({
    description: 'Review background image',
    example: 'training-1.png',
  })
  @Expose()
  public user: UserRdo;

  @ApiProperty({
    description: 'User rating',
    example: 5,
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Review content',
    example: 'A good workout, but...',
  })
  @Expose()
  public content: string;

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
