import Timeout = NodeJS.Timeout;

export function smoothScroll(params: {
  element: Element | Window
  from?: number
  to: number
  onFinal?: () => void
  duration?: number
  stepFunc?: (from: number, to: number, ratio: number) => number
  force?: boolean
}) {
  let taskId: Timeout;
  const {
    element,
    from = 'scrollTop' in element ? element.scrollTop : element.scrollY,
    to,
    onFinal = () => null,
    duration = 400,
    stepFunc = easeInOut,
    force = false,
  } = params;
  const frameMillis = 10;
  const step = Math.floor(duration / frameMillis);
  let currentPos = 0;
  const scrollStep = (i: number) => {
    currentPos = Math.round(stepFunc(from, to, i / step));
    element.scrollTo({top: currentPos});
    if (i < step) {
      taskId = setTimeout(() => scrollStep(i + 1), frameMillis);
    } else {
      onFinal();
    }
  };
  const listener = ev => {
    if (!force && Math.abs(('scrollTop' in element ? element.scrollTop : element.scrollY) - currentPos) > 1) {
      clearTimeout(taskId);
      element.removeEventListener('scroll', listener);
      onFinal();
    }
  };
  element.addEventListener('scroll', listener);
  taskId = setTimeout(() => scrollStep(0), frameMillis);
  return () => {
    clearTimeout(taskId);
    element.removeEventListener('scroll', listener);
    onFinal();
  };
}

export function easeInOut(from: number, to: number, ratio: number) {
  return from + (to - from) * (1 - (Math.cos(Math.PI * ratio) + 1) / 2);
}

export function windowSmoothScroll(params: {
  el: Element
  duration?: number
  stepFunc?: (from: number, to: number, ratio: number) => number
  force?: boolean
}) {
  const {el, duration = 500, stepFunc = easeInOut, force = false} = params;
  return smoothScroll({
    element: window,
    from: window.scrollY,
    to: window.scrollY + el.getBoundingClientRect().y,
    duration: duration,
    stepFunc: stepFunc,
    force: force,
  });
}