import { Logger, NotFoundException } from '@nestjs/common';

export class DiaryRecordNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Diary record with the id — ${id} not found`);
  }
}
