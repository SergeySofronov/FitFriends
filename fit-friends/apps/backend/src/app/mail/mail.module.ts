import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { getMailConfig } from '@fit-friends/core';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig())
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
