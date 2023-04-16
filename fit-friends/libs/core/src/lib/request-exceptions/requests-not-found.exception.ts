import { NotFoundException, Logger } from '@nestjs/common';

export class RequestsNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Requests not found`;
    super(message);
    this.logger.error(message);
  }
}
