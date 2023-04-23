import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailSubject } from './mail.constant';
import { Training, User } from '@fit-friends/shared-types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  public async sendMailNewTraining(user: User, training: Training) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: EmailSubject.EMAIL_ADD_TRAINING_SUBJECT,
      template: './new-training',
      context: {
        user: user.name,
        url: this.configService.get<string>('frontendUrl.host'),
        title: training.title,
      }
    })
  }
}
