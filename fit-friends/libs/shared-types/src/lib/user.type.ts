import { UserLevelType } from './user-level.enum';
import { LocationType } from './user-location.enum';
import { UserRoleType } from './user-role.enum';
import { UserSexType } from './user-sex.enum';
import { TrainingStyleType } from './training-style.enum';
import { TrainingTimeType } from './user-training-time.enum';

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  sex: UserSexType;
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
