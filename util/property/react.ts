import {useEffect, useState} from 'react';
import {Listener, Observable, Property} from './api';

export function useObservable<S extends (any | any[])>(p: Observable<S>): S {
  const [state, setState] = useState<S>(() => p.value);
  useEffect(() => {
    setState(p.value);
    const listener: Listener<S> = (_ob, _o, n) => {
      setState(Array.isArray(n) ? [...n] as S : n);
    };
    p.addListener(listener);
    return () => p.removeListener(listener);
  }, [p]);
  return state;
}

export type UpdateFn<T> = (v: T | ((e: T) => T)) => void;

export function useProperty<S extends (any | any[])>(p: Property<S>): [S, UpdateFn<S>] {
  const value = useObservable(p);
  return [value, (v) => {
    p.update(v);
  }];
}
