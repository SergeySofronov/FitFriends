import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderNotFoundIdException, OrderNotOwnerIdException, UserNotFoundIdException } from '@fit-friends/core';
import { TrainingRepository } from '../training/training.repository';
import { UserRepository } from '../users/user.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './query/order.query';
import { OrderCategory } from '@fit-friends/shared-types';

@Injectable()
export class OrderService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly trainingRepository: TrainingRepository,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) { }

  private async checkOrderOwner(orderId: number, userId: number) {
    const user = await this.checkUserExist(userId);
    const order = await this.getOrderById(orderId);
    if (user.id !== order.userId) {
      throw new OrderNotOwnerIdException(this.logger, orderId, userId);
    }
  }

  public async checkUserExist(userId: number) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new UserNotFoundIdException(this.logger, userId);
    }
    return existUser;
  }

  public async getOrderById(orderId: number) {
    const existOrder = await this.orderRepository.findById(orderId);
    if (!existOrder) {
      throw new OrderNotFoundIdException(this.logger, orderId);
    }

    return existOrder;
  }

  public async createOrder(dto: CreateOrderDto, userId: number) {
    await this.checkUserExist(userId);
    //todo: заменить this.trainingRepository на this.gymRepository
    const { price } = (dto.category === OrderCategory.Training) ?
      await this.trainingRepository.findById(dto.serviceId) :
      await this.trainingRepository.findById(dto.serviceId);

    const total = price * dto.quantity;
    const newOrder = new OrderEntity({ ...dto, price, total, userId });
    return this.orderRepository.create(newOrder);
  }

  public async updateOrder(dto: UpdateOrderDto, orderId: number, userId: number) {
    throw new Error();
  }

  public async getOrders(query: OrderQuery, userId: number) {
    throw new Error();
  }

  public async getPurchases(query: OrderQuery, userId: number) {
    throw new Error();
  }

  public async deleteOrder(orderId: number, userId: number) {
    await this.checkOrderOwner(orderId, userId);
    return this.orderRepository.destroy(orderId);
  }

}
