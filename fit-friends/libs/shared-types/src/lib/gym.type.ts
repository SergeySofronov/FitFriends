import { GymFeature } from "./gym-feature.enum";
import { Location } from "./user-location.enum";

export type Gym = {
  id?: number;
  title: string;
  location: Location;
  isVerified: boolean;
  gymType: GymFeature;
  photo: string[];
  description: string;
  price: number;
  constructionDate: Date;
}
