import { Module } from '@nestjs/common';
import { UserBalanceService } from './balance.service';
import { UserBalanceController } from './balance.controller';

@Module({
  providers: [UserBalanceService],
  controllers: [UserBalanceController],
  exports: [UserBalanceService]
})
export class UserBalanceModule { }
