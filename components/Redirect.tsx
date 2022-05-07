import {ReactNode, useEffect, useState} from 'react';
import {useInterval} from '../util/hook';

type Props = {
  text?: ReactNode
  url: string
  delay?: number
}

export const Redirect = (props: Props) => {
  const {text, url, delay = 0} = props;
  const [time, setTime] = useState(delay);

  const interval = useInterval(() => setTime(t => t - 100), 100);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useEffect(() => {
    if (time <= 0) {
      window.location.href = url;
      interval.stop();
    }
  }, [time, url]);

  return (
    <div className={'flex flex-col items-center text-xl break-all text-center'}>
      {text && (
        <div className={'text-2xl'}>
          {text}
        </div>
      )}
      <div className={'my-4 text-4xl'}>
        {time > 0 ? (
          <div>
            {Math.floor(time / 1000)}秒后将会自动跳转
          </div>
        ) : (
          <div>
            正在跳转...
          </div>
        )}
      </div>
      <div>
        <div>
          如果没有自动跳转，请点击下方链接
        </div>
        <a href={url} className={'underline text-blue-600 hover:text-blue-400'}>
          {url}
        </a>
      </div>
    </div>
  );
};