import {zex} from 'common/util/zod';
import {FC, useCallback, useMemo, useRef} from 'react';
import {Key} from 'ts-key-enum';
import {toRange} from '../../../util/math';
import {mergeRefs} from '../../../util/react';
import {SchemaInput, SchemaInputProps} from '../SchemaInput/SchemaInput';

type Props = {
  min?: number
  max?: number
  step?: number
  precision?: number
  trailingZero?: boolean
  integer?: boolean
} & Omit<SchemaInputProps<number>, 'schema'>;

export const NumberInput: FC<Props> = (
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    onKeyDown,
    onChange,
    value,
    precision = 2,
    trailingZero = false,
    integer = false,
    forceUpdateRef,
    ...rest
  },
) => {
  const forceUpdate = useRef<() => void>();
  const schema = useMemo(() => zex.str.number.refine((e) => {
    if (integer && !Number.isSafeInteger(e)) {
      return false;
    }
    return e >= min && e <= max;
  }), [integer, min, max]);

  return (
    <SchemaInput<number>
      format={useCallback((e: number) => {
        const s = e.toFixed(precision);
        if (!trailingZero) {
          return s.replace(/\.(.*?)0+$/, '.$1').replace(/\.$/, '');
        }
        return s;
      }, [precision, trailingZero])}
      forceUpdateRef={mergeRefs([forceUpdateRef, forceUpdate])}
      {...rest}
      value={value}
      onChange={onChange}
      schema={schema}
      onKeyDown={(e) => {
        onKeyDown && onKeyDown(e);
        switch (e.key) {
          case Key.ArrowUp:
            onChange(toRange(value + step, [min, max]));
            forceUpdate.current && forceUpdate.current();
            break;
          case Key.ArrowDown:
            onChange(toRange(value - step, [min, max]));
            forceUpdate.current && forceUpdate.current();
            break;
          default:
            return;
        }
        e.preventDefault();
      }}
    />
  );
};
