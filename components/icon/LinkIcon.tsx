import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

type Props = {
  href: string
  icon: ReactNode
  target?: HTMLAttributeAnchorTarget
}

export const LinkIcon = (props: Props) => {
  const {href, icon, target} = props;
  return (
    <Link href={href} >
      <a target={target}>
        {icon}
      </a>
    </Link>
  );
};