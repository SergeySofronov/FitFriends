export enum RequestStatus {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

export type RequestStatusType = keyof typeof RequestStatus;
