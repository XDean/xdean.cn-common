import {Observable, Listener} from './api';

export class Listeners<T> {
  protected listeners: Listener<T>[] = [];

  addListener = (l: Listener<T>): void => {
    this.listeners.push(l);
  };

  removeListener = (l: Listener<T>) => {
    const index = this.listeners.indexOf(l);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  };

  callListener = (ob: Observable<T>, o: T, n: T) => {
    this.listeners.forEach((l) => {
      l(ob, o, n);
    });
  };
}
