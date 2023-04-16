import { NotFoundException, Logger } from '@nestjs/common';

export class NotificationsNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Notifications not found`;
    super(message);
    this.logger.error(message);
  }
}
