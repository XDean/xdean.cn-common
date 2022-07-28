import {FC} from 'react';
import {zex} from '../../util/zod';
import {SchemaInput, SchemaInputProps} from './SchemaInput';


export const NumberInput: FC<Omit<SchemaInputProps<number>, 'schema'>> = (props) => (
  <SchemaInput<number>
    {...props}
    schema={zex.str.number}
  />
);

export const IntegerInput: FC<Omit<SchemaInputProps<number>, 'schema'>> = (props) => (
  <SchemaInput<number>
    {...props}
    schema={zex.str.int}
  />
);