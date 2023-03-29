import { OrderCategory, OrderCategoryType, PaymentType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { TrainingRdo } from '../../training/rdo/training.rdo';
import { UserRdo } from '../../users/rdo/user.rdo';
import { OrderValidity as OV } from '../order.constant';

export class OrderRdo {
  @ApiProperty({
    description: 'Order unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Unique identifier of the customer',
    example: 1,
    type: () => UserRdo
  })
  @Expose()
  public user: UserRdo;

  @ApiProperty({
    description: "Order category",
    example: OrderCategory.Training,
  })
  @Expose()
  public category: OrderCategoryType;

  @ApiProperty({
    description: 'Contents of the order item',
    type: () => TrainingRdo
  })
  @Transform(({ obj }) => obj.category === OrderCategory.SeasonPass ? obj.service = obj.gym : obj.service = obj.training)
  @Expose()
  public service: TrainingRdo /*| GymRdo*/; //todo WIP

  @ApiProperty({
    description: 'Order item price',
    example: 1000,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Order items quantity',
    example: OV.ItemQuantityMin,
  })
  @Expose()
  public quantity: number;

  @ApiProperty({
    description: 'The total price of order',
    example: 1000,
  })
  @Expose()
  public total: number;

  @ApiProperty({
    description: "Payment method",
    example: OrderCategory.Training,
  })
  @Expose()
  public paymentMethod: PaymentType;

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
