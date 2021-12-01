import React from 'react';
import {Badge} from './Badge';

type Props = {
  total?: number
  loading?: boolean
  onGotoComment?: () => void
}

export const Comment = (props: Props) => {
  const {total, loading, onGotoComment} = props;

  return (
    <Badge left={`💬 评论`}
           right={total}
           loading={loading}
           onLeftClick={onGotoComment}
           tooltip={'评论'}/>
  );
};