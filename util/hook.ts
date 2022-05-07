import {useState, useEffect, useRef} from 'react';
import {isSSR} from './next';

function getWindowDimensions() {
  if (isSSR()) {
    return {
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0,
      clientWidth: 0,
      clientHeight: 0,
    };
  }
  const {innerWidth, innerHeight, outerHeight, outerWidth} = window;
  const {clientWidth, clientHeight} = document.documentElement;
  return {
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
    clientWidth,
    clientHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useInterval(fn: () => void, interval: number) {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number>();

  const start = () => {
    if (!active) {
      setActive(true);
      intervalRef.current = window.setInterval(fn, interval);
    }
  };

  const stop = () => {
    setActive(false);
    window.clearInterval(intervalRef.current);
  };

  const toggle = () => {
    if (active) {
      stop();
    } else {
      start();
    }
  };

  return {start, stop, toggle, active};
}