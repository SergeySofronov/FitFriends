export enum UserGender {
  Male = 'Male',
  Female = 'Female',
  Indifferent = 'Indifferent',
}

export type UserGenderType = keyof typeof UserGender;
