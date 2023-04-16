import { Logger, NotFoundException } from '@nestjs/common';

export class RequestNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Request with the id — ${id} not found`);
  }
}
