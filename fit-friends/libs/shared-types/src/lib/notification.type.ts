export type Notification = {
  id?: number;
  userId: number;
  text: string;
  isChecked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
