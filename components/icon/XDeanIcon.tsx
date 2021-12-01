import xdeanLogo from '../../resources/logo.ico';
import {Icon} from './Icon';

export const XDeanIcon = () => {
  // TODO hover to xd
  return (
    <Icon src={xdeanLogo}
          alt={'XDean'}
          link={'https://xdean.cn'}
          rounded
          ring
    />
  );
};