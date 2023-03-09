
export enum TrainingTime {
  Max30 = 'Max30',
  Max50 = 'Max50',
  Max80 = 'Max80',
  Over80 = 'Over80',
}

export type TrainingTimeType = keyof typeof TrainingTime;
