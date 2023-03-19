import { TrainingTimeType } from "./user-training-time.enum";

export type UserFeatures = {
  trainingTime: TrainingTimeType;
  caloriesLoss: number;
  caloriesLossPerDay: number;
  isReadyForTraining: boolean;
}

export type CoachFeatures = {
  certificate: string;
  merits: string;
  isPersonalCoach: boolean;
}

export type Features = UserFeatures | CoachFeatures;
