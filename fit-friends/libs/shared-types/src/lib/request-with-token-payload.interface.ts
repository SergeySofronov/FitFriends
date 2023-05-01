export interface RequestWithTokenPayload<T> extends Partial<Request> {
  user: T
}
