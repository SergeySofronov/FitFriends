import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { RequestCategory, RequestCategoryType } from '@fit-friends/shared-types';

export class CreateRequestDto {
  @ApiProperty({
    description: 'The unique identifier of the requested user',
    example: 1,
    required: true,
  })
  @IsNumber({ allowNaN: false })
  public requestedId: number;

  @ApiProperty({
    description: "Request type/category",
    example: RequestCategory.Friendship,
    enum: RequestCategory,
    required: true,
  })
  @IsEnum(RequestCategory, { message: `${VM.IsEnumMessage} ${Object.values(RequestCategory).join(', ')}` })
  public category: RequestCategoryType;
}
