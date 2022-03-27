import {isDEV} from '../env';

export function BaiduAnalytics(props: { id: string }) {
  const {id} = props;
  return (
    isDEV ? null : <script dangerouslySetInnerHTML={{
      __html: `var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?${id}";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`,
    }}/>
  );
}