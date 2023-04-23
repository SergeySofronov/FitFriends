import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { OrderQuery as OQ, OrderSort } from '../order.constant';



export class OrderQuery {
  @Transform(({ value }) => transformToMax(value, OQ.ORDER_QUERY_MIN, OQ.ORDER_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = OQ.ORDER_DEFAULT_PAGE;

  @IsEnum(OrderSort, { message: `${VM.IsEnumMessage} ${Object.values(OrderSort).join(', ')}` })
  @IsOptional()
  public sortType?: OrderSort = OrderSort.Total;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = OQ.ORDER_DEFAULT_SORT_DIRECTION;
}
