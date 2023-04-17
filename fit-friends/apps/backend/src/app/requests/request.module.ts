import { Logger, Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { UsersModule } from '../users/user.module';
import { RequestRepository } from './request.repository';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    UsersModule,
    NotifyModule
  ],
  providers: [
    RequestService,
    RequestRepository,
    Logger
  ],
  controllers: [RequestController],
})
export class RequestModule { }
