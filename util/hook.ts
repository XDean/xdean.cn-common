import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isSSR } from './next';

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

export function useSingle<T>(init: () => T): T {
  const value = useRef<T>();
  const first = useRef(true);
  if (first) {
    first.current = false;
    value.current = init();
  }
  return value.current as T;
}

export function useFunction<T extends Function>(handler: T): T {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any[]) => handlerRef.current(...args), []) as any as T;
}

export function useAnimationFrame(frame: (delta: number, timestamp: number) => void) {
  const frameFn = useFunction(frame);
  useEffect(() => {
    let animationHandle = -1;
    let lastTime = -1;
    const frame = (timestamp: number) => {
      if (lastTime === -1) {
        frameFn(0, timestamp);
      } else {
        frameFn(timestamp - lastTime, timestamp);
      }
      lastTime = timestamp;
      animationHandle = requestAnimationFrame(frame);
    };
    animationHandle = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animationHandle);
    };
  }, []);
}

