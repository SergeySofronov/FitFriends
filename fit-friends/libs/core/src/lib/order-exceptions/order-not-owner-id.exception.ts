import { Logger, BadRequestException } from '@nestjs/common';

export class OrderNotOwnerIdException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    id: number,
    userId: number,
  ) {
    super(`The user with id - ${userId} is not the owner of the order with id - ${id}`);
  }
}
