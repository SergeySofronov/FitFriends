import { Module, Logger } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { UsersModule } from '../users/user.module';
import { TrainingModule } from '../training/training.module';
import { GymsModule } from '../gyms/gym.module';
import { UserBalanceModule } from '../user-balance/user-balance.module';

@Module({
  imports: [
    UsersModule,
    UserBalanceModule,
    TrainingModule,
    GymsModule
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    Logger
  ],
})
export class OrderModule { }
