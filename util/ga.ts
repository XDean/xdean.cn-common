import {useEffect} from 'react';
import {useRouter} from 'next/router';
import ReactGA from 'react-ga4';

export const useGA = (id: string) => {
  const router = useRouter();
  useEffect(() => {
    service.init(id);
    service.view(router.asPath);
  }, [id]);
  useEffect(() => {
    const handleRouteChange = (url: string) => service.view(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

const dev = {
  init: () => console.info('[ga] init'),
  view: (url: string) => console.info('[ga] view', url),
};

const prod = {
  init: (id: string) => ReactGA.initialize(id),
  view: (url: string) => ReactGA.pageview(url),
};

const service = process.env.NODE_ENV === 'production' ? prod : dev;