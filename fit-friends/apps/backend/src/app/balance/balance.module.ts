import { Module } from '@nestjs/common';
import { UserBalanceService } from './balance.service';
import { UserBalanceController } from './balance.controller';

@Module({
  providers: [UserBalanceService],
  controllers: [UserBalanceController],
})
export class UserBalanceModule {}
