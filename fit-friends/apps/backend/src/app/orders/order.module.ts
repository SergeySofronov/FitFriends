import { Module, Logger } from '@nestjs/common';
import { JwtStrategy } from '@fit-friends/core';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { UsersModule } from '../users/user.module';
import { TrainingModule } from '../training/training.module';

@Module({
  imports: [
    UsersModule,
    TrainingModule
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    JwtStrategy,
    Logger
  ],
})
export class OrderModule { }
