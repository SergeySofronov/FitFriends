import { Injectable, Logger } from '@nestjs/common';
import { OrderNotFoundIdException, OrderNotOwnerIdException, OrdersNotFoundException } from '@fit-friends/core';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './query/order.query';
import { OrderCategory } from '@fit-friends/shared-types';
import { TrainingService } from '../training/training.service';
import { GymService } from '../gyms/gym.service';
import { UserService } from '../users/user.service';
import { UserBalanceService } from '../user-balance/user-balance.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly balanceService: UserBalanceService,
    private readonly orderRepository: OrderRepository,
    private readonly trainingService: TrainingService,
    private readonly gymService: GymService,
    private readonly logger: Logger,
  ) { }

  private async checkOrderOwner(orderId: number, userId: number) {
    const user = await this.userService.getUserById(userId);
    const order = await this.getOrderById(orderId);
    if (user.id !== order.userId) {
      throw new OrderNotOwnerIdException(this.logger, orderId, userId);
    }
  }

  public async getOrderById(orderId: number) {
    const existOrder = await this.orderRepository.findById(orderId);
    if (!existOrder) {
      throw new OrderNotFoundIdException(this.logger, orderId);
    }

    return existOrder;
  }

  public async createOrder(dto: CreateOrderDto, userId: number) {
    await this.userService.getUserById(userId);

    const { price } = (dto.category === OrderCategory.Training) ?
      await this.trainingService.getTrainingById(dto.serviceId) :
      await this.gymService.getGymById(dto.serviceId);

    let trainingId = undefined;
    let gymId = undefined;

    const total = price * dto.quantity;
    if (dto.category === OrderCategory.Training) {
      trainingId = dto.serviceId;
    } else {
      gymId = dto.serviceId;
    }
    delete dto.serviceId;

    const newOrder = new OrderEntity({ ...dto, trainingId, gymId, price, total, userId });
    await this.balanceService.updateUserBalance(dto.category, dto.serviceId, userId, true);

    return this.orderRepository.create(newOrder);
  }

  public async updateOrder(dto: UpdateOrderDto, orderId: number, userId: number) {
    await this.checkOrderOwner(orderId, userId);
    return this.orderRepository.update(orderId, dto);
  }

  public async getOrders(query: OrderQuery, coachId: number) {
    const existOrder = await this.orderRepository.findOrders(query, coachId);
    if (!existOrder?.length) {
      throw new OrdersNotFoundException(this.logger);
    }
    return existOrder;
  }

  public async deleteOrder(orderId: number, userId: number) {
    await this.checkOrderOwner(orderId, userId);
    return this.orderRepository.destroy(orderId);
  }

}
