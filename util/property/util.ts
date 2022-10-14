import {isObservable, Observable, Property} from './api';
import {SimpleObservable} from './observable';
import {SimpleProperty} from './property';

export type ShallowProp<T> = [T] extends [object]
  ? {
    readonly [K in keyof T]: Property<T[K]>
  }
  : Property<T>;

export type DeepProp<T> = [T] extends [object]
  ? {
    readonly [K in keyof T]: DeepProp<T[K]>
  }
  : Property<T>;

export function prop<T>(value: T): Property<T> {
  return new SimpleProperty(value);
}

export function observable<T, D extends readonly Observable<any>[]>(
  fn: (...values: {[K in keyof D]: D[K] extends Observable<infer V> ? V : never}) => T,
  deps: D,
): Observable<T> {
  const value = fn(...(deps.map((e) => e.value) as any));
  const ob = new SimpleObservable(value);
  deps.forEach((d) => {
    d.addListener(() => {
      ob.value = fn(...(deps.map((e) => e.value) as any));
    });
  });
  return ob;
}

export function shallowProp<T>(value: T): ShallowProp<T> {
  if (typeof value === 'object') {
    const res: any = {};
    for (const [k, v] of Object.entries(value)) {
      res[k] = prop(v);
    }
    return res;
  } else {
    return prop<T>(value) as unknown as ShallowProp<T>;
  }
}

export function deepProp<T>(value: T): DeepProp<T> {
  if (typeof value === 'object') {
    const res: any = {};
    for (const [k, v] of Object.entries(value)) {
      res[k] = deepProp(v);
    }
    return res;
  } else {
    return prop<T>(value) as unknown as DeepProp<T>;
  }
}

export function unObservable<T>(obj: any): T {
  if (isObservable(obj)) {
    return obj.value;
  } else if (typeof obj === 'object') {
    const res: any = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = unObservable(v);
    }
    return res;
  } else {
    return obj as unknown as T;
  }
}

export function allObservable(obj: any): Observable<any>[] {
  if (isObservable(obj)) {
    return [obj];
  } else if (typeof obj === 'object') {
    const res: Observable<any>[] = [];
    for (const v of Object.values(obj)) {
      res.push(...allObservable(v));
    }
    return res;
  } else {
    return [];
  }
}

export function observeAll<T>(obj: any): Observable<T> {
  const value = unObservable<T>(obj);
  const ob = new SimpleObservable<T>(value);
  allObservable(obj).forEach((dep) => {
    dep.addListener(() => {
      ob.value = unObservable(obj);
    });
  });
  return ob;
}
