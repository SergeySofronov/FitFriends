import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { UserValidity as UV } from '../user.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: VM.IsEmailMessage })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    required: true,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(UV.NameMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.NameMaxLength, { message: VM.MaxValueMessage })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(UV.PasswordMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.PasswordMaxLength, { message: VM.MaxValueMessage })
  public password: string;
}
