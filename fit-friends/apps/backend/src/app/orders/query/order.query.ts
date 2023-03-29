import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { OrderQuery as OQ, OrderSort } from '../order.constant';



export class OrderQuery {
  @Transform(({ value }) => transformToMax(value, OQ.ORDER_QUERY_MIN, OQ.ORDER_QUERY_MAX))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(OrderSort, { message: `${VM.IsEnumMessage} ${Object.values(OrderSort).join(', ')}` })
  @IsOptional()
  public sortType?: OrderSort = OrderSort.Total;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = OQ.DEFAULT_ORDER_SORT_DIRECTION;
}
