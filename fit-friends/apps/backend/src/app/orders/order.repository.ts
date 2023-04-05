import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { Order } from '@fit-friends/shared-types';
import { OrderSort, OrderQuery as OQ, OrderSortField } from './order.constant';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';

@Injectable()
export class OrderRepository implements CRUDRepositoryInterface<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: OrderEntity): Promise<Order> {
    const entityData = item.toObject();
    console.log(entityData);
    return await this.prisma.order.create({
      data: {
        ...entityData,
      },
      include: {
        gym: true,
        training: true,
        user: true
      }
    });
  }

  public async findById(id: number): Promise<Order> {
    return await this.prisma.order.findFirst({
      where: { id },
      include: {
        gym: true,
        training: true,
        user: true
      }
    });
  }

  public async findOrders({
    limit = OQ.ORDER_QUERY_MAX,
    page = 1,
    sortDirection = OQ.DEFAULT_ORDER_SORT_DIRECTION,
    sortType = OrderSort.Total,
  }: OrderQuery, coachId: number): Promise<Order[]> {
    const sortField = { [OrderSortField[sortType]]: sortDirection };

    const orders = [];
    const groups = await this.prisma.order.groupBy({
      by: ['trainingId'],
      where: {
        AND: [
          { training: { coachId } },
          { category: 'Training' }
        ]
      },
      _sum: {
        quantity: true,
        total: true,
      },
      orderBy: [
        {
          _sum: {
            ...sortField
          }
        }
      ]
    })

    for await (const item of groups) {
      const order = await this.prisma.order.findFirst({
        where: { trainingId: item.trainingId },
        include: {
          gym: true,
          training: true,
          user: true,
        },
      })
      order.quantity = item._sum.quantity;
      order.total = item._sum.total;
      orders.push(order);
    }

    const skip = page > 0 ? limit * (page - 1) : 0;
    const take = skip + limit;

    return orders.slice(skip, take);
  }

  public async findPurchases({
    limit = OQ.ORDER_QUERY_MAX,
    page = 1,
    sortDirection = OQ.DEFAULT_ORDER_SORT_DIRECTION,
    sortType = OrderSort.Total,
  }: OrderQuery, userId: number): Promise<Order[]> {
    const sortField = { [OrderSortField[sortType]]: sortDirection };
    return this.prisma.order.findMany({
      take: limit,
      where: {
        userId
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: {
        gym: true,
        training: true,
        user: true,
      },
    });
  }

  public async update(id: number, item: Partial<OrderEntity>): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...item,
      },
      include: {
        gym: true,
        training: true,
        user: true
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    })
  }
}
