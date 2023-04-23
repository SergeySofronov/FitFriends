import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { OrderCategory, OrderCategoryType, Payment, PaymentType } from '@fit-friends/shared-types';
import { OrderValidity as OV } from '../order.constant';

export class CreateOrderDto {
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
    description: 'Order item unique identifier',
    example: 1,
    required: true,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public serviceId: number;

  @ApiProperty({
    description: 'Number of items in the order',
    example: OV.ItemQuantityMin,
    minimum: OV.ItemQuantityMin,
    maximum: OV.ItemQuantityMax,
    required: true,
  })
  @Min(OV.ItemQuantityMin, { message: VM.MinValueMessage })
  @Max(OV.ItemQuantityMax, { message: VM.MaxValueMessage })
  public quantity: number;

  @ApiProperty({
    description: "Payment method",
    example: Payment.Mir,
    type: () => Payment,
    enum: Payment,
    required: true,
  })
  @IsEnum(Payment, { message: `${VM.IsEnumMessage} ${Object.values(Payment).join(', ')}` })
  public paymentMethod: PaymentType;
}
