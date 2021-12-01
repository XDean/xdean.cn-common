import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {Icon} from './Icon';

type Props = {
  className?: string
  user?: string
  repo: string
  codePath?: string
}

export const GithubIcon = (props: Props) => {
  const {repo, user = 'XDean', codePath} = props;
  return <Icon alt={'Github'}
               icon={width => <FontAwesomeIcon icon={faGithub} style={{fontSize: width}}/>}
               rounded
               link={`https://github.com/${user}/${repo}` + (codePath ? '/blob/main' + codePath : '')}
               ring
  />;
};