import { TrainingStyle } from "./training-style.enum";
import { UserLevel } from "./user-level.enum";
import { Location } from "./user-location.enum";
import { UserRole } from "./user-role.enum";
import { UserGender } from "./user-sex.enum";

export type Coach = {
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
  certificates: string;
  merits: string;
  isPersonalCoach: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
