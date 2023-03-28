import { RequestStatusType } from "./request-status.enum";

export type UserRequest = {
  id?: number;
  requesterId: number;
  requestedId: number;
  status: RequestStatusType;
  createdAt?: Date;
  updatedAt?: Date;
}
