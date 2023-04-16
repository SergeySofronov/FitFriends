import { Logger, Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { GymRepository } from './gym.repository';

@Module({
  controllers: [GymController],
  providers: [
    GymService,
    GymRepository,
    Logger
  ],
  exports: [GymService]
})
export class GymsModule { }
