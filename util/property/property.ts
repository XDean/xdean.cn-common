/* eslint-disable max-classes-per-file */
import {Listener, Property, PropertySymbol} from './api';
import {Listeners} from './listener';

export abstract class AbstractProperty<T> implements Property<T> {
  readonly type = PropertySymbol;

  abstract value: T;

  protected listeners = new Listeners<T>();

  addListener = this.listeners.addListener;

  removeListener = this.listeners.removeListener;

  protected callListener = (old: T) => {
    this.listeners.callListener(this, old, this.value);
  };

  update = (f: ((old: T) => T) | T): () => void => {
    const oldValue = this.value;
    this.value = f instanceof Function ? f(this.value) : f;
    return () => {
      this.value = oldValue;
    };
  };

  static of<T>(value: T) {
    return new SimpleProperty<T>(value);
  }
}

export class SimpleProperty<T> extends AbstractProperty<T> {
  private internalValue: T;

  constructor(defaultValue: T) {
    super();
    this.internalValue = defaultValue;
  }

  get value(): T {
    return this.internalValue;
  }

  set value(value: T) {
    const oldValue = this.internalValue;
    if (oldValue === value) {
      return;
    }
    this.internalValue = value;
    this.callListener(oldValue);
  }
}

export class NestProperty<F, T> extends AbstractProperty<T> {
  private current: Property<T>;

  private innerListener: Listener<T> = (_ob, o, _n) => {
    this.callListener(o);
  };

  private ownerListener: Listener<F> = (_on, _o, n) => {
    const old = this.current.value;
    this.current.removeListener(this.innerListener);
    this.current = this.map(n);
    this.current.addListener(this.innerListener);
    this.callListener(old);
  };

  constructor(
    owner: Property<F>,
    private map: (f: F) => Property<T>,
  ) {
    super();
    owner.addListener(this.ownerListener);
    this.current = map(owner.value);
    this.current.addListener(this.innerListener);
  }

  get value(): T {
    return this.current.value;
  }

  set value(value: T) {
    this.current.value = value;
  }
}
