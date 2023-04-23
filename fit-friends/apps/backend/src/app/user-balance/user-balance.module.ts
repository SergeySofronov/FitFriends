import { Logger, Module } from '@nestjs/common';
import { UserBalanceService } from './user-balance.service';
import { UserBalanceController } from './user-balance.controller';
import { UserBalanceRepository } from './user-balance.repository';

@Module({
  providers: [
    UserBalanceService,
    UserBalanceRepository,
    Logger
  ],
  controllers: [UserBalanceController],
  exports: [UserBalanceService]
})
export class UserBalanceModule { }
