import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { OrderCategory, OrderCategoryType } from '@fit-friends/shared-types';

export class UpdateUserBalanceDto {
  @ApiProperty({
    description: "Order category",
    example: OrderCategory.Training,
    type: () => OrderCategory,
    enum: OrderCategory,
    required: true,
  })
  @IsEnum(OrderCategory, { message: `${VM.IsEnumMessage} ${Object.values(OrderCategory).join(', ')}` })
  public category: OrderCategoryType;

  @ApiProperty({
    description: 'Service item unique identifier',
    example: 1,
    required: true,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public serviceId: number;
}
