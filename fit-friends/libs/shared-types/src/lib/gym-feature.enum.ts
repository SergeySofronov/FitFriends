export enum GymFeature {
  SwimmingPool = 'SwimmingPool',
  FreeParking = 'FreeParking',
  ChildrenRoom = 'ChildrenRoom',
  Massage = 'Massage',
}

export type GymFeatureType = keyof typeof GymFeature;
