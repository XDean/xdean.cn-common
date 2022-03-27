import { FaGithub } from 'react-icons/fa';
import { Icon } from './Icon';

type Props = {
  className?: string
  user?: string
  repo: string
  codePath?: string
}

export const GithubIcon = (props: Props) => {
  const {repo, user = 'XDean', codePath} = props;
  return <Icon alt={'Github'}
               icon={width => <FaGithub size={width}/>}
               rounded
               link={`https://github.com/${user}/${repo}` + (codePath ? '/blob/main' + codePath : '')}
               ring
  />;
};