import React, { useCallback } from 'react';
import useSWR from 'swr';
import { Like as LikeState } from '../../api/impl/domain';
import { fetchJsonApi } from '../../util/fetch';
import { Badge } from './Badge';

type Props = {
  like?: boolean
  total?: number
  loading?: boolean
  onLike: () => void
}

export const Like = (props: Props) => {
  const {like = false, total = 0, loading, onLike} = props;

  return (
    <Badge left={`❤️ ${like ? '已喜欢' : '喜欢'}`}
           right={total}
           loading={loading}
           onLeftClick={onLike}
           tooltip={like ? '取消喜欢' : '喜欢'}/>
  );
};

export const LikeWithAPI = ({id}: { id: string }) => {
  const like = useSWR<LikeState>(`/api/like?id=${id}`, fetchJsonApi);
  const onLike = useCallback(() => {
    fetch(`/api/like?id=${id}&value=${!(like.data?.you ?? false)}`, {
      method: 'POST',
    }).then(() => like.mutate());
    like.mutate(l => l === undefined ? {total: 1, you: true} : ({
      total: l.you ? l.total - 1 : l.total + 1,
      you: !l.you,
    }), false)
      .then();
  }, [like, id]);
  return (
    <Like total={like.data?.total || 0}
          like={!!like.data?.you}
          loading={like.data === undefined}
          onLike={onLike}
    />
  );
};