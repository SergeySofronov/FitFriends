import { UserLevelType } from './user-level.enum';
import { LocationType } from './user-location.enum';
import { UserRoleType } from './user-role.enum';
import { UserGenderType } from './user-sex.enum';
import { TrainingStyleType } from './training-style.enum';
import { TrainingTimeType } from './user-training-time.enum';

export type User = {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  gender: UserGenderType;
  dateBirth: Date;
  role?: UserRoleType;
  location: LocationType;
  level: UserLevelType;
  trainingStyle: TrainingStyleType;
  trainingTime: TrainingTimeType;
  caloriesLoss: number;
  caloriesLossPerDay: number;
  isReadyForTraining: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
