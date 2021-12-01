import {useState, useEffect} from 'react';
import {isSSR} from './next';

function getWindowDimensions() {
  if (isSSR()) {
    return {
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0,
    };
  }
  const {innerWidth, innerHeight, outerHeight, outerWidth} = window;
  return {
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
