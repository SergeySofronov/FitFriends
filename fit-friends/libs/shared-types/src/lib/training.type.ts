import { UserLevel } from "./user-level.enum";
import { TrainingStyle } from "./training-style.enum";
import { TrainingTime } from "./user-training-time.enum";
import { UserGenderType } from "./user-sex.enum";

export type Training = {
  id?: number;
  title: string;
  backgroundImage: string;
  level: UserLevel;
  trainingStyle: TrainingStyle;
  trainingTime: TrainingTime;
  price: number;
  caloriesLoss: number;
  description: string;
  gender: UserGenderType;
  video: string;
  rating: number;
  coachId: number;
  isSpecial: boolean;
}
