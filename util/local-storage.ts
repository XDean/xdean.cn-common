import { z, ZodError, ZodTypeDef } from 'zod';
import useSWR, { mutate } from 'swr';

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
    const str = localStorage.getItem(this.key);
    if (str === null) {
      return this.defaultValue;
    }
    const p = this.schema.safeParse(JSON.parse(str));
    if (p.success) {
      return p.data;
    } else {
      console.warn('wrong local storage value, use default value.', str, p.error);
      return this.defaultValue;
    }
  };

  set = (t: T) => {
    const p = this.schema.safeParse(t);
    if (p.success) {
      this.value = t;
      localStorage.setItem(this.key, JSON.stringify(t));
      mutate(this.swrKey, t);
    }
  };

  use = (): [T, (t: T) => void] => {
    const res = useSWR<T, ZodError>(this.swrKey, this.get);
    return [res.data ?? this.defaultValue, this.set];
  };
}