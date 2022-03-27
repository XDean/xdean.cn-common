import clsx from 'clsx';

type Props = {
  className?: string
}
export const Footer = (props: Props) => {
  const {className} = props;
  return (
    <div className={clsx('mb-2 border-t text-center text-gray-600 text-sm pt-0.5', className)}>
      Copyright © 2020-{new Date().getFullYear()} Dean Xu. All Rights reserved.
    </div>
  );
};