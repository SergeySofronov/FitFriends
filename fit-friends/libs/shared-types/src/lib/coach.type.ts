import { TrainingStyleType } from "./training-style.enum";
import { UserLevelType } from "./user-level.enum";
import { LocationType } from "./user-location.enum";
import { UserRoleType } from "./user-role.enum";
import { UserSexType } from "./user-sex.enum";

export type Coach = {
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
  certificates: string;
  merits: string;
  isPersonalCoach: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
