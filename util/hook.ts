import {useState, useEffect} from 'react';
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
