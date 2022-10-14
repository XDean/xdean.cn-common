export const ObservableSymbol = Symbol('observable');
export const PropertySymbol = Symbol('property');

export type Change<T> = [Observable<T>, T, T];

export interface Listener<T> {
  (p: Observable<T>, o: T, n: T): void;
}

export interface Observable<T> {
  readonly type: symbol;

  readonly value: T;

  addListener(l: Listener<T>): void;

  removeListener(l: Listener<T>): void;
}

export interface Property<T> extends Observable<T> {
  value: T;

  update(value: T | ((old: T) => T)): () => void;
}

export function isObservable(obj: any): obj is Observable<any> {
  if ('type' in obj) {
    return obj.type === ObservableSymbol || obj.type === PropertySymbol;
  } else {
    return false;
  }
}

export function isProperty(obj: any): obj is Property<any> {
  if ('type' in obj) {
    return obj.type === PropertySymbol;
  } else {
    return false;
  }
}
