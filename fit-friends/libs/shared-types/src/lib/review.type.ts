export type Review = {
  id?: number;
  userId: number;
  trainingId: number;
  rating: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
