import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class NotifyRdo {
  @ApiProperty({
    description: 'Notification unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'The unique ID of the user for whom the notification is being created',
    example: 1,
  })
  @Expose()
  public notifiedUserId: number;

  @ApiProperty({
    description: 'The unique ID of the user who created the notification',
    example: 1,
  })
  @IsOptional()
  @Expose()
  public notifyingUserId?: number;

  @ApiProperty({
    description: 'Notification text',
    example: 'The user wants to be added to your friends',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: "Flag indicating that the notification has been read",
    example: false,
  })
  @Expose()
  public isChecked: boolean;

  @ApiProperty({
    description: 'Date of creation of the notification',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Date of update of the notification',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public updatedAt: string;
}
