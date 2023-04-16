export type Notification = {
  id?: number;
  notifiedUserId: number;
  notifyingUserId?: number;
  text: string;
  isChecked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
