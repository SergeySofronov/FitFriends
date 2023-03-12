import { UserLevel } from './user-level.enum';
import { Location } from './user-location.enum';
import { UserRole } from './user-role.enum';
import { UserGender } from './user-sex.enum';
import { TrainingStyle } from './training-style.enum';
import { TrainingTime } from './user-training-time.enum';

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  sex: UserGender;
  dateBirth: Date;
  role?: UserRole;
  location: Location;
  level: UserLevel;
  trainingStyle: TrainingStyle;
  trainingTime: TrainingTime;
  caloriesLoss: number;
  caloriesLossPerDay: number;
  isReadyForTraining: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
