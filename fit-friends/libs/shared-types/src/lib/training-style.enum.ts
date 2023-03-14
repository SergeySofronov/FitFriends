export enum TrainingStyle {
  Yoga = 'Yoga',
  Running = 'Running',
  Boxing = 'Boxing',
  Stretching = 'Stretching',
  Crossfit = 'Crossfit',
  Aerobics = 'Aerobics',
  Pilates = 'Pilates',
}

export type TrainingStyleType = keyof typeof TrainingStyle;
