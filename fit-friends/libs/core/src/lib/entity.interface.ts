export interface Entity<T, E> {
    toObject(): T;
    fillEntity(entity: E): void;
}
