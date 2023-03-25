import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Location, LocationType, TrainingStyle, TrainingStyleType, UserGenderType, UserLevel, UserLevelType, UserRole, UserRoleType } from '@fit-friends/shared-types';
import { UserGender } from '@prisma/client';
import { FeaturesRdo } from './user-features.rdo';

export class UserRdo {
  @ApiProperty({
    description: 'User unique identifier',
    example: 1,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John Doe',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: "User's avatar",
    example: 'default-avatar.jpg',
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: "User's gender",
    example: `${UserGender.Male}`,
  })
  @Expose()
  public gender: UserGenderType;

  @ApiProperty({
    description: "User's date of birth",
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ obj }) => new Date(obj.updatedAt).toISOString())
  @Expose()
  public dateBirth: Date;

  @ApiProperty({
    description: "User's role",
    example: `${UserRole.User}`,
    type: () => String,
    enum: UserRole,
  })
  @Expose()
  public role: UserRoleType;

  @ApiProperty({
    description: "User's location",
    example: `${Location.Petrogradskaya}`,
    type: () => String,
    enum: Location,
  })
  @Expose()
  public location: LocationType;

  @ApiProperty({
    description: "User's training level",
    example: `${UserLevel.Beginner}`,
    type: () => String,
    enum: UserLevel,
    required: true,
  })
  @Expose()
  public level: UserLevelType;

  @ApiProperty({
    description: "User's trining style",
    example: `${TrainingStyle.Aerobics}`,
    type: () => String,
    enum: TrainingStyle,
  })
  @Expose()
  public trainingStyle: TrainingStyleType;

  @ApiProperty({
    description: 'User first name',
    example: 'John Doe',
  })
  @Expose()
  @Type(() => FeaturesRdo)
  @Transform(({ obj }) => {
    obj.features = obj.userFeatures ? obj.userFeatures : obj.coachFeatures;
    delete obj.features.id;
    return obj.features;
  })
  public features: FeaturesRdo;

  @ApiProperty({
    description: 'Date of creation of the user account',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ obj }) => new Date(obj.updatedAt).toISOString())
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Date of update of the user account',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ obj }) => new Date(obj.updatedAt).toISOString())
  @Expose()
  public updatedAt: Date;
}
