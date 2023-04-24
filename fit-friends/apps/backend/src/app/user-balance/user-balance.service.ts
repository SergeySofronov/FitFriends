import { Injectable, Logger } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UserBalanceEntity } from './user-balance.entity';
import { OrderCategoryType, UserBalance } from '@fit-friends/shared-types';
import { UserBalanceQuery } from './query/user-balance.query';
import { OrderCategory } from '@prisma/client';
import { UserBalanceNotFoundIdException } from '@fit-friends/core';
import { UserBalanceValidity as BV } from './user-balance.constant';

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly balanceRepository: UserBalanceRepository,
    private readonly logger: Logger,
  ) { }

  public async getUserBalanceByService(category: OrderCategoryType, serviceId: number, userId: number): Promise<UserBalance> {
    const existBalance = await this.balanceRepository.findByServiceId(userId, { serviceId });
    if (!existBalance) {
      throw new UserBalanceNotFoundIdException(this.logger, userId);
    }

    return existBalance;
  }

  public async getUserBalance(query: UserBalanceQuery, userId: number): Promise<UserBalance[]> {
    const existBalance = await this.balanceRepository.find(query, { userId });
    if (!existBalance?.length) {
      throw new UserBalanceNotFoundIdException(this.logger, userId);
    }
    return existBalance;
  }

  public async createUserBalance(dto: CreateUserBalanceDto, userId: number): Promise<UserBalance> {
    const newUserBalance = new UserBalanceEntity({ ...dto, userId });
    return this.balanceRepository.create(newUserBalance);
  }

  public async updateUserBalance(category: OrderCategoryType, serviceId: number, userId: number, isIncrease: boolean): Promise<UserBalance> {
    const service = (category === OrderCategory.SeasonPass) ? 'gymId' : 'trainingId';
    const dto = {
      [service]: serviceId,
      available: BV.IncreaseValue,
      category
    }
    const existBalance = await this.balanceRepository.findByServiceId(userId, { [service]: serviceId });

    if (!existBalance) {
      if (isIncrease) {
        return this.createUserBalance(dto, userId);  //Существование gym или training осуществляется в OrderModule->createOrder()
      } else {
        throw new UserBalanceNotFoundIdException(this.logger, userId);
      }
    }

    if (isIncrease) {
      return this.balanceRepository.update(existBalance.id, { updatedAt: new Date() }, { available: { increment: BV.IncreaseValue } });
    }

    if (!isIncrease && existBalance.available > 0) {
      return this.balanceRepository.update(existBalance.id, { updatedAt: new Date() }, { available: { decrement: BV.IncreaseValue }, spent: { increment: BV.IncreaseValue } });
    }

    return existBalance;
  }
}
