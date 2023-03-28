import { Logger, NotFoundException } from '@nestjs/common';

export class OrderNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Order with the id — ${id} not found`);
  }
}
