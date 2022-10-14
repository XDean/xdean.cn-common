import clsx from 'clsx';
import {InputHTMLAttributes, Ref, useEffect, useImperativeHandle, useState} from 'react';
import {z, ZodTypeDef} from 'zod';

export type SchemaInputProps<T> = {
  value: T
  onChange: (value: T) => void
  schema: z.Schema<T, ZodTypeDef, string | T>
  format?: (value: T) => string
  styled?: boolean // enable default style
  forceUpdateRef?: Ref<() => void> // it not refreshes when focused, call this to force refresh
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'toString'>;

// eslint-disable-next-line
export const SchemaInput = <T, >(
  {
    value,
    onChange,
    schema,
    format = String,
    styled = true,
    className,
    forceUpdateRef,
    ...rest
  }: SchemaInputProps<T>,
) => {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [force, setForce] = useState(false);
  useEffect(() => {
    if (force || !focus) {
      setForce(false);
      setText(format(value));
    }
  }, [force, focus, value, format]);

  useImperativeHandle(forceUpdateRef, () => () => setForce(true));

  return (
    <input
      {...rest}
      className={clsx(
        styled && 'border px-0.5 rounded focus:ring-blue-400 focus:ring-1 transition',
        className,
      )}
      value={text}
      onChange={(e) => {
        const next = e.currentTarget.value;
        setText(next);
        const res = schema.safeParse(next);
        if (res.success) {
          onChange(res.data);
        }
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
};
