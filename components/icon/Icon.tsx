import clsx from 'clsx';
import {ImageProps} from 'next/image';
import Link from 'next/link';
import {HTMLAttributeAnchorTarget, ReactElement} from 'react';
import useWindowDimensions from '../../util/hook';
import Image from '../Image';

export type IconProps = {
  width?: number
  alt: string
  link?: string
  linkTarget?: HTMLAttributeAnchorTarget
  rounded?: boolean
  className?: string
  ring?: boolean
} & ({
  src: Exclude<ImageProps['src'], string>
  icon?: null
} | {
  src?: null
  icon: (width: number) => ReactElement
})

export const Icon = (props: IconProps) => {
  const {clientWidth} = useWindowDimensions();
  const defaultWidth = clientWidth > 768 ? 40 : 28;
  const {
    width = defaultWidth,
    src,
    icon,
    alt,
    link,
    rounded = false,
    ring = false,
    linkTarget = '_blank',
    className,
  } = props;
  const iconComp = icon ? icon(width) : <Image src={src!}
                                               alt={alt}
                                               width={width}/>;
  const wrapper = (
    <div className={clsx('inline-block',
      rounded && 'rounded-full overflow-hidden',
      ring && 'leading-[0px] hover:ring-2 transition',
      className)}>
      {iconComp}
    </div>
  );
  if (link) {
    return (
      <Link href={link}>
        <a target={linkTarget}
           href={link}>
          {wrapper}
        </a>
      </Link>
    );
  } else {
    return wrapper;
  }
};