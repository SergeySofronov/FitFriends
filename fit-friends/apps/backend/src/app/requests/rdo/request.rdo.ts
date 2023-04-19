import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { RequestCategory, RequestCategoryType, RequestStatus, RequestStatusType } from '@fit-friends/shared-types';

export class RequestRdo {
  @ApiProperty({
    description: 'Request unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Unique identifier of the requesting user',
    example: 1,
  })
  @Expose()
  public requesterId: string;

  @ApiProperty({
    description: 'Unique identifier of the requested user',
    example: 2,
  })
  @Expose()
  public requestedId: string;

  @ApiProperty({
    description: "Request type/category",
    example: RequestCategory.Friendship,
  })
  @Expose()
  public category: RequestCategoryType;

  @ApiProperty({
    description: "Request status",
    example: RequestStatus.Accepted,
  })
  @Expose()
  public status: RequestStatusType;

  @ApiProperty({
    description: 'Date of creation of the request',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of update of the request',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public updatedAt: string;
}
