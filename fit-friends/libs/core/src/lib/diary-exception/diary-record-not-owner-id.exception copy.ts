import { Logger, BadRequestException } from '@nestjs/common';

export class DiaryRecordNotOwnerIdException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    id: number,
    userId: number,
  ) {
    super(`The user with id - ${userId} is not the owner of diary record with id - ${id}`);
  }
}
