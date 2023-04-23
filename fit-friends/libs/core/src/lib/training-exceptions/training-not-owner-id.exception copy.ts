import { Logger, BadRequestException } from '@nestjs/common';

export class TrainingNotOwnerIdException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    id: number,
    userId: number,
  ) {
    super(`The user with id - ${userId} is not the owner of the workout with id - ${id}`);
  }
}
