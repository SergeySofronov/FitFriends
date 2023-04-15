import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { GymValidity as GV } from '../gym.constant';
import { GymFeature, GymFeatureType, Location, LocationType } from '@fit-friends/shared-types';

export class GymRdo {
  @ApiProperty({
    description: 'Gym unique identifier',
    example: 1,
  })
  @Expose()

  public id: string;
  @ApiProperty({
    description: 'Gym title',
    example: 'Fitstar',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Gym location',
    example: Location.Petrogradskaya,
    type: () => String,
    enum: Location,
  })
  @Expose()
  public location: LocationType;

  @ApiProperty({
    description: "Is gym verified",
    example: true,
  })
  @Expose()
  public isVerified: boolean;

  @ApiProperty({
    description: "Gym features",
    example: [GymFeature.ChildrenRoom, GymFeature.FreeParking],
    type: () => [GymFeature],
    isArray: true,
  })
  @Expose()
  public gymFeature: GymFeatureType[];

  @ApiProperty({
    description: "Gym photos",
    example: ['photo-1.jpg', 'photo-1.jpg'],
  })
  @Expose()
  photo: string[];

  @ApiProperty({
    description: 'Gym description',
    example: 'Premium sports complex with...',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'The price of a subscription to the gym',
    example: GV.PriceMinValue,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Date of creation of the gym',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public constructionDate: string;
}
