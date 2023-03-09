import { TrainingTimeType } from "./user-training-time.enum";

export type UserInfo = {
  trainingTime: TrainingTimeType;
  сaloriesLoss: number;
  сaloriesLossPerDay: number;
  isReadyForTraining: boolean;
}

