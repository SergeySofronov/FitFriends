export enum UserSex {
  Male = 'Male',
  Female = 'Female',
  Indifferent = 'Indifferent',
}

export type UserSexType = keyof typeof UserSex;
