import {InputHTMLAttributes, useEffect, useState} from 'react';
import {z, ZodTypeDef} from 'zod';

export type SchemaInputProps<T> = {
  value: T
  onChange: (value: T) => void
  schema: z.Schema<T, ZodTypeDef, string | T>
  format?: (value: T) => string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'toString'>

export const SchemaInput = <T, >(
  {
    value,
    onChange,
    schema,
    format = String,
    ...rest
  }: SchemaInputProps<T>,
) => {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (!focus) {
      setText(format(value));
    }
  }, [focus, value, format]);
  return (
    <input
      {...rest}
      value={text}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onChange={e => {
        const next = e.currentTarget.value;
        setText(next);
        const res = schema.safeParse(next);
        if (res.success) {
          onChange(res.data);
        }
      }}
    />
  );
};