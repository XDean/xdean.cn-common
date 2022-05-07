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

export function randomInt(range: number) {
  return Math.floor(Math.random() * range);
}

export function randomId(prefix = '') {
  return `${prefix}`;
}

export function randomDouble(range: number) {
  return Math.random() * range;
}

export function randomOne<T>(...vs: T[]): T {
  return vs[randomInt(vs.length)];
}

export function randomOneWithWeight<T>(...vs: {value: T, w: number}[]): T {
  const sum = vs.map((e) => e.w).reduce((a, b) => a + b);
  const ran = randomDouble(sum);
  let cur = 0;
  for (const v of vs) {
    cur += v.w;
    if (cur > ran) {
      return v.value;
    }
  }
  return vs[vs.length - 1].value;
}
