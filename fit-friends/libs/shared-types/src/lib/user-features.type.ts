import { TrainingStyleType } from "./training-style.enum";
import { TrainingTimeType } from "./user-training-time.enum";

export type UserFeatures = {
  trainingStyle: TrainingStyleType;
  trainingTime: TrainingTimeType;
  caloriesLoss: number;
  caloriesLossPerDay: number;
  isReadyForTraining: boolean;
}
