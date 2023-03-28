import { NotFoundException, Logger } from '@nestjs/common';

export class OrdersNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Orders not found`;
    super(message);
    this.logger.error(message);
  }
}
