import { GymFeatureType } from "./gym-feature.enum";
import { LocationType } from "./user-location.enum";

export type Gym = {
  id?: number;
  title: string;
  location: LocationType;
  isVerified: boolean;
  gymFeature: GymFeatureType[];
  photo: string[];
  description: string;
  price: number;
  constructionDate: Date;
}
