export function randomDate(start: Date, duration: number) {
  return new Date(start.getTime() + Math.random() * duration);
}

export function randomStr(length: number) {
  let res = '';
  while (res.length < length) {
    res += (Math.random() + 1).toString(36).substring(2);
  }
  return res.substring(res.length - length);
}

export function randomInt(start?: number, end?: number) {
  return Math.floor(randomFloat(start, end));
}

export function randomId(prefix = '') {
  return `${prefix}`;
}

export function randomFloat(start?: number, end?: number) {
  if (start === undefined) {
    end = 1;
    start = 0;
  } else if (end === undefined) {
    end = start;
    start = 0;
  }
  return Math.random() * (end - start) + start;
}

export function randomOne<T>(...vs: T[]): T {
  return vs[randomInt(vs.length)];
}

export function randomOneWithWeight<T>(...vs: {value: T, w: number}[]): T {
  const sum = vs.map((e) => e.w).reduce((a, b) => a + b);
  const ran = randomFloat(sum);
  let cur = 0;
  for (const v of vs) {
    cur += v.w;
    if (cur > ran) {
      return v.value;
    }
  }
  return vs[vs.length - 1].value;
}
