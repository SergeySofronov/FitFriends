import { Logger, BadRequestException } from '@nestjs/common';

export class RequestUpdateNotAllowedException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    id: number,
    userId: number,
  ) {
    super(`The user with id - ${userId} is not the requested user of the request entity with id - ${id}`);
  }
}
