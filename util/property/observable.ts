import {Observable, ObservableSymbol} from './api';
import {Listeners} from './listener';

export class SimpleObservable<T> implements Observable<T> {
  readonly type = ObservableSymbol;

  private internalValue: T;

  private readonly listeners = new Listeners<T>();

  constructor(defaultValue: T) {
    this.internalValue = defaultValue;
  }

  addListener = this.listeners.addListener;

  removeListener = this.listeners.removeListener;

  get value() {
    return this.internalValue;
  }

  set value(value: T) {
    const old = this.internalValue;
    this.internalValue = value;
    this.listeners.callListener(this, old, value);
  }
}
