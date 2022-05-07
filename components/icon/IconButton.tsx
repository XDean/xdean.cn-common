import { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLDivElement>

export const IconButton: FC<Props> = (props) => {
  const {children, className, ...rest} = props;
  return (
    <div
      {...rest}
      className={clsx(
        'cursor-pointer rounded-full p-[1px] lg:p-1 select-none',
        'bg-white text-gray-600 hover:bg-gray-600 hover:text-white transition',
        className)}
    >
      {children}
    </div>
  );
};