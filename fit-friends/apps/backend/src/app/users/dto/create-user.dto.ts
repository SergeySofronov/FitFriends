import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsEmail, IsEnum, IsNotEmptyObject, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { UserValidity as UV } from '../user.constant';
import { Features, Location, LocationType, TrainingStyle, TrainingStyleType, UserGender, UserGenderType, UserLevel, UserLevelType, UserRole, UserRoleType } from '@fit-friends/shared-types';
import { CoachFeaturesDto, FeaturesDto, UserFeaturesDto } from './user-features.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
    required: true,
  })
  @Transform(({ obj }) => { obj.features.__role = obj.role; return obj.email; })
  @IsEmail({}, { message: VM.IsEmailMessage })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    minLength: UV.NameMinLength,
    maxLength: UV.NameMaxLength,
    required: true,
  })
  @Transform(({ value }) => value instanceof String ? value.replace(/\s{2,}/g, ' ').trim() : value)
  @MinLength(UV.NameMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.NameMaxLength, { message: VM.MaxValueMessage })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: UV.PasswordMinLength,
    maxLength: UV.PasswordMaxLength,
    required: true,
  })
  @MinLength(UV.PasswordMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.PasswordMaxLength, { message: VM.MaxValueMessage })
  @Matches(/[a-zA-Z0-9]+/)
  public password: string;

  @ApiProperty({
    description: "User's gender",
    example: UserGender.Male,
    type: () => String,
    enum: UserGender,
    required: true,
  })
  @IsEnum(UserGender, { message: `${VM.IsEnumMessage} ${Object.values(UserGender).join(', ')}` })
  public gender: UserGenderType;

  @ApiProperty({
    description: "User's date of birth",
    example: `${new Date().toISOString()}}`,
    type: () => String,
    required: true,
  })
  @IsDateString()
  public dateBirth: Date;

  @ApiProperty({
    description: "User's role",
    example: UserRole.User,
    type: () => String,
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole, { message: `${VM.IsEnumMessage} ${Object.values(UserRole).join(', ')}` })
  public role: UserRoleType;

  @ApiProperty({
    description: "User's location",
    example: Location.Petrogradskaya,
    type: () => String,
    enum: Location,
    required: true,
  })
  @IsEnum(Location, { message: `${VM.IsEnumMessage} ${Object.values(Location).join(', ')}` })
  public location: LocationType;

  @ApiProperty({
    description: "User's training level",
    example: UserLevel.Beginner,
    type: () => String,
    enum: UserLevel,
    required: true,
  })
  @IsEnum(UserLevel, { message: `${VM.IsEnumMessage} ${Object.values(UserLevel).join(', ')}` })
  public level: UserLevelType;

  @ApiProperty({
    description: "User's trining style",
    example: TrainingStyle.Aerobics,
    type: () => String,
    enum: TrainingStyle,
    required: true,
  })
  @IsEnum(TrainingStyle, { message: `${VM.IsEnumMessage} ${Object.values(TrainingStyle).join(', ')}` })
  public trainingStyle: TrainingStyleType;

  @ApiProperty({
    description: 'User features. Depends on "role" field',
    oneOf: [
      { $ref: getSchemaPath(UserFeaturesDto) },
      { $ref: getSchemaPath(CoachFeaturesDto) }
    ],
    required: true,
  })
  @Type(() => FeaturesDto, {
    keepDiscriminatorProperty: false,
    discriminator: {
      property: "__role",
      subTypes: [
        { value: UserFeaturesDto, name: UserRole.User },
        { value: CoachFeaturesDto, name: UserRole.Coach }
      ]
    }
  })
  @IsNotEmptyObject()
  @ValidateNested()
  public features: Features;

}
