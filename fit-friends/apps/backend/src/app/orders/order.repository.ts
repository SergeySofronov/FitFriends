import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { Order } from '@fit-friends/shared-types';
import { OrderSort, OrderQuery as OQ, OrderSortField } from './order.constant';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';
import { OrderCategory } from '@prisma/client';

@Injectable()
export class OrderRepository implements CRUDRepositoryInterface<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: OrderEntity): Promise<Order> {
    const entityData = item.toObject();
    const isIncluded = entityData.category === OrderCategory.SeasonPass;
    const order = await this.prisma.order.create({
      data: {
        ...entityData,
      },
      include: {
        gym: isIncluded,
        training: !isIncluded,
      }
    });
    return order;
  }

  public async findById(id: number): Promise<Order> {
    return await this.prisma.order.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = OQ.ORDER_QUERY_MAX,
    page = 1,
    sortDirection = OQ.DEFAULT_ORDER_SORT_DIRECTION,
    sortType = OrderSort.Price,
  }: OrderQuery): Promise<Order[]> {
    const sortField = { [OrderSortField[sortType]]: sortDirection };

    return this.prisma.order.findMany({
      take: limit,
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<OrderEntity>): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    })
  }
}
