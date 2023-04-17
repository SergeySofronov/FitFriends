import { Features, UserRole, UserRoleType } from '@fit-friends/shared-types';
import { ApiProperty, OmitType, PartialType, getSchemaPath } from '@nestjs/swagger';
import { IsEnum, IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
import { ValidityMessage as VM } from '@fit-friends/core';
import { CreateUserDto } from './create-user.dto';
import { Transform, Type } from 'class-transformer';
import { CoachFeaturesDto, FeaturesDto, UserFeaturesDto } from './user-features.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['email', 'password', 'role', 'features'])) {
  @ApiProperty({
    description: "User's role",
    example: `${UserRole.User}`,
    type: () => String,
    enum: UserRole,
    required: true,
  })
  @Transform(({ obj }) => {
    if (obj.features) {
      obj.features.__role = obj.role;
    }
    return obj.role;
  })
  @IsEnum(UserRole, { message: `${VM.IsEnumMessage} ${Object.values(UserRole).join(', ')}` })
  public role: UserRoleType;

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
        { value: PartialType(UserFeaturesDto), name: UserRole.User },
        { value: PartialType(CoachFeaturesDto), name: UserRole.Coach }
      ]
    }
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @IsOptional()
  public features?: Features;


  public avatar?: string;
}
