import { Logger, BadRequestException } from '@nestjs/common';

export class NotificationNotOwnerIdException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    id: number,
    userId: number,
  ) {
    super(`The user with id - ${userId} is not the owner of notification with id - ${id}`);
  }
}
