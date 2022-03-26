import useSWR from 'swr';
import { Fetcher, Key, SWRConfiguration } from 'swr/dist/types';

export const useSWROnce = <Data = any, Error = any, SWRKey extends Key = null>(key: SWRKey, config: SWRConfiguration<Data, Error, Fetcher<Data, SWRKey>> | undefined) => {
  return useSWR(key, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    ...config,
  });
};