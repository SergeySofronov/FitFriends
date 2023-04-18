import { Injectable, Logger } from '@nestjs/common';
import { UserBalanceRepository } from './balance.repository';
import { CreateUserBalanceDto } from './dto/create-balance.dto';
import { UserBalanceEntity } from './balance.entity';
import { OrderCategoryType } from '@fit-friends/shared-types';
import { UserBalanceQuery } from './query/balance.query';
import { OrderCategory } from '@prisma/client';

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly balanceRepository: UserBalanceRepository,
    private readonly logger: Logger,
  ) { }

  public async createUserBalance(dto: CreateUserBalanceDto) {
    const newUserBalance = new UserBalanceEntity(dto);
    return this.balanceRepository.create(newUserBalance);
  }

  //todo: сделать два обработчика - увеличить баланс и уменьшить
  public async updateUserBalance(category: OrderCategoryType, serviceId: number, isIncrease: boolean) {
    const option = (category === OrderCategory.Training) ? { gymId: serviceId } : { trainingId: serviceId };
    const existBalance = this.balanceRepository.findByServiceId(query, option);

    if (existBalance)

      return this.balanceRepository.create(newUserBalance);
  }
}
