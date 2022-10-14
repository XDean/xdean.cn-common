import {z, ZodError, ZodTypeDef} from 'zod';
import useSWR, {mutate} from 'swr';
import produce from 'immer';

export class LocalStorage<T> {
  private value: T;
  readonly key: string;
  readonly defaultValue: T;
  readonly schema: z.Schema<T, ZodTypeDef, string | T>;

  constructor(
    params: {
      key: string,
      defaultValue: T,
      schema: z.Schema<T, ZodTypeDef, string | T>,
    }) {
    this.key = params.key;
    this.defaultValue = params.defaultValue;
    this.schema = params.schema;
    this.value = this.getRaw();
  }

  get swrKey() {
    return `local-storage:${this.key}`;
  }

  get = () => {
    return this.value;
  };

  private getRaw = () => {
    if (typeof localStorage === 'undefined') {
      return this.defaultValue;
    }
    const str = localStorage.getItem(this.key);
    if (str === null) {
      return this.defaultValue;
    }
    const p = this.schema.safeParse(JSON.parse(str));
    if (p.success) {
      return p.data;
    } else {
      console.error(`wrong local storage value ${this.key}`, str, p.error);
      return this.defaultValue;
    }
  };

  set = (t: T) => {
    const p = this.schema.safeParse(t);
    if (p.success) {
      this.value = t;
      localStorage.setItem(this.key, JSON.stringify(t));
      mutate(this.swrKey, t);
    } else {
      console.error(`fail to set local storage ${this.key}`, p.error);
    }
  };

  update = (update: (t: T) => void) => {
    this.set(produce(this.get(), update));
  };

  use = (): [T, (t: T) => void] => {
    const res = useSWR<T, ZodError>(this.swrKey, this.get);
    return [res.data ?? this.defaultValue, this.set];
  };
}