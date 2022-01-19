import Timeout = NodeJS.Timeout;

export function smoothScroll(params: {
  element: Element
  from?: number
  to: number
  onDone?: () => void
  duration?: number
}) {
  let taskId: Timeout;
  const {
    element,
    from = element.scrollTop,
    to,
    onDone = () => null,
    duration = 400,
  } = params;
  const frameMillis = 20;
  const step = duration / frameMillis;
  const each = (to - from) / step;
  const scrollStep = (i: number) => {
    element.scrollTo({top: from + each * i});
    if (i < step) {
      taskId = setTimeout(() => scrollStep(i + 1), frameMillis);
    } else {
      onDone();
    }
  };
  taskId = setTimeout(() => scrollStep(0), frameMillis);
  return () => clearTimeout(taskId);
}