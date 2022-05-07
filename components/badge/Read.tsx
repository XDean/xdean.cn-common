import React, { ReactNode } from 'react';
import useSWR from 'swr';
import { Read as ReadState } from '../../api/impl/domain';
import { fetchJsonApi } from '../../util/fetch';
import { Badge } from './Badge';

type Props = {
  name?: string
  total?: number | ReactNode
  loading?: boolean
}

export const Read = (props: Props) => {
  const {name = '‍️阅读', total, loading} = props;
  return (
    <Badge left={`👋 ‍️${name}`}
           right={total}
           loading={loading}
           tooltip={`${name}量`}/>
  );
};

export const ReadWithAPI = ({id, ...rest}: { id: string } & Props) => {
  const read = useSWR<ReadState>(`/api/read?id=${id}`, fetchJsonApi);
  return (
    <Read total={<div title={`${read.data?.unique_total}`}>{read.data?.total}</div> || 0}
          loading={read.data === undefined}
          {...rest}
    />
  );
};