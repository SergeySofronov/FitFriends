import { Injectable, Logger } from '@nestjs/common';
import { OrderNotFoundIdException, OrderNotOwnerIdException, OrdersNotFoundException, UserNotFoundIdException } from '@fit-friends/core';
import { UserRepository } from '../users/user.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderQuery } from './query/order.query';
import { OrderCategory } from '@fit-friends/shared-types';
import { TrainingService } from '../training/training.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
    private readonly trainingService: TrainingService,
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
    //todo: заменить trainingService на gymService в else
    const { price } = (dto.category === OrderCategory.Training) ?
      await this.trainingService.getTrainingById(dto.serviceId) :
      await this.trainingService.getTrainingById(dto.serviceId);

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

  public async getPurchases(query: OrderQuery, userId: number) {
    const existOrder = await this.orderRepository.findPurchases(query, userId);
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
