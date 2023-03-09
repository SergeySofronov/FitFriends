export enum UserLevel {
  Beginner = 'Beginner',
  Middle = 'Middle',
  Professional= 'Professional',
}

export type UserLevelType = keyof typeof UserLevel;
