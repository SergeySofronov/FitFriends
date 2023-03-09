export type Order = {
  id?: number;
  userId: number;
  price: number;
  quantity: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

