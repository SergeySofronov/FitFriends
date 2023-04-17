import { Logger, Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { NotifyRepository } from './notify.repository';

@Module({
  controllers: [NotifyController],
  providers: [
    NotifyService,
    NotifyRepository,
    Logger
  ],
  exports: [NotifyService]
})
export class NotifyModule { }
