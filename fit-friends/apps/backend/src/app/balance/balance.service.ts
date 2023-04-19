import { Injectable, Logger } from '@nestjs/common';
import { UserBalanceRepository } from './balance.repository';
import { CreateUserBalanceDto } from './dto/create-balance.dto';
import { UserBalanceEntity } from './balance.entity';
import { OrderCategoryType, UserBalance } from '@fit-friends/shared-types';
import { UserBalanceQuery } from './query/balance.query';
import { OrderCategory } from '@prisma/client';
import { UserBalanceNotFoundIdException } from '@fit-friends/core';
import { UserBalanceValidity as BV } from './balance.constant';

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly balanceRepository: UserBalanceRepository,
    private readonly logger: Logger,
  ) { }

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
    const existBalance = await this.balanceRepository.findByServiceId({ [service]: serviceId });

    if (!existBalance) {
      if (isIncrease) {
        return this.createUserBalance(dto, userId);  //Существование gym или training осуществляется в OrderModule->createOrder()
      } else {
        throw new UserBalanceNotFoundIdException(this.logger, userId);
      }
    }

    if (isIncrease) {
      return this.balanceRepository.update(existBalance.id, {}, { available: { increment: BV.IncreaseValue } });
    }

    if (!isIncrease && existBalance[service] > 0) {
      return this.balanceRepository.update(existBalance.id, {}, { available: { decrement: BV.IncreaseValue }, spent: { increment: BV.IncreaseValue } });
    }

    return existBalance;
  }
}
