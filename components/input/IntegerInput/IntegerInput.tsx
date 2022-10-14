import {PropsOf} from 'common/util/react';
import {FC} from 'react';
import {NumberInput} from '../NumberInput';

type Props = Omit<PropsOf<typeof NumberInput>, 'integer' | 'precision'>;

export const IntegerInput: FC<Props> = (props) => (
  <NumberInput
    {...props}
    integer
    precision={0}
  />
);
