import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { OrderCategoryType, OrderCategory } from '@fit-friends/shared-types';

export class UserBalanceRdo {
  @ApiProperty({
    description: 'UserBalance item unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Balance item category',
    example: 1,
    enum: OrderCategory,
  })
  @Expose()
  public category: OrderCategoryType;

  @ApiProperty({
    description: 'Training or Gym unique identifier',
    example: 1,
  })
  @Expose()
  @Transform(({ obj }) => obj.serviceId = (obj.category === OrderCategory.SeasonPass) ? obj.gymId : obj.trainingId)
  public serviceId: number;

  @ApiProperty({
    description: 'Number of available season passes or training sessions',
    example: 1,
  })
  @Expose()
  public available: number;

  @ApiProperty({
    description: 'Number of spent season passes or training sessions',
    example: 1,
  })
  @Expose()
  public spent: number;

  @ApiProperty({
    description: 'Date of update of the user account',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public updatedAt: string;
}
