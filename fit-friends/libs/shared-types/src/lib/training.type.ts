import { UserLevelType } from "./user-level.enum";
import { TrainingStyleType } from "./training-style.enum";
import { TrainingTimeType } from "./user-training-time.enum";
import { UserGenderType } from "./user-sex.enum";

export type Training = {
  id?: number;
  title: string;
  backgroundImage: string;
  level: UserLevelType;
  trainingStyle: TrainingStyleType;
  trainingTime: TrainingTimeType;
  price: number;
  caloriesLoss: number;
  description: string;
  gender: UserGenderType;
  video: string;
  rating: number;
  coachId: number;
  isSpecial: boolean;
  reviewsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
