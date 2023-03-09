import { UserLevelType } from "./user-level.enum";
import { TrainingStyleType } from "./training-style.enum";
import { TrainingTimeType } from "./user-training-time.enum";
import { UserSexType } from "./user-sex.enum";

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
  sex: UserSexType;
  video: string;
  rating: number;
  coachId: number;
  isSpecial: boolean;
}
