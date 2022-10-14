import {Observable as RxOb} from 'rxjs';
import {Change, Observable, Listener} from './api';

export function fromChange<T>(observable: Observable<T>): RxOb<Change<T>> {
  return new RxOb<Change<T>>((subscriber) => {
    const l: Listener<T> = (ob, o, n) => {
      subscriber.next([ob, o, n]);
    };
    observable.addListener(l);
    subscriber.next([observable, observable.value, observable.value]);
    return () => observable.removeListener(l);
  });
}

export function fromValue<T>(ob: Observable<T>): RxOb<T> {
  return new RxOb<T>((subscriber) => {
    const l: Listener<T> = (_ob, _o, n) => {
      subscriber.next(n);
    };
    ob.addListener(l);
    subscriber.next(ob.value);
    return () => ob.removeListener(l);
  });
}
