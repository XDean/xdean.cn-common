import React, {ReactNode} from 'react';
import {XDeanIcon} from './icon/XDeanIcon';
import {GithubIcon} from './icon/GithubIcon';
import Link from 'next/link';


type Props = {
  icon: ReactNode
  title: string
  titleLink?: string
  repo: string
}

export const AppBar = (props: Props) => {
  const {icon, title, titleLink = '/', repo} = props;
  return (
    <div className={'w-full shadow-md p-2 border-b bg-white z-10 flex flex-row items-center'}>
      <div className={'flex flex-row items-center justify-center'}>
        {icon}
      </div>
      <Link href={titleLink}>
        <a className={'ml-2 text-3xl md:text-4xl link'}>
          {title}
        </a>
      </Link>
      <div className={'flex-grow w-0'}/>
      <div className={'flex-row items-center flex space-x-2'}>
        <XDeanIcon/>
        <GithubIcon repo={repo}/>
      </div>
    </div>
  );
};