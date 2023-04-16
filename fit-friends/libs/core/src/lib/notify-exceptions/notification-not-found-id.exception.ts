import { Logger, NotFoundException } from '@nestjs/common';

export class NotificationNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Notification with the id — ${id} not found`);
  }
}
