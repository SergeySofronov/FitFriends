import { RequestStatus } from "./request-status.enum";

export type Request = {
  id?: number;
  requesterId: number;
  requestedId: number;
  status: RequestStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
