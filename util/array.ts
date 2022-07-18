export async function toArray<T>(iterator: AsyncGenerator<T>) {
  const arr = [];
  for await (const entry of iterator) {
    arr.push(entry);
  }
  return arr;
}

export function range(start: number, end?: number) {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return Array.from(new Array(end - start).keys()).map(e => e + start);
}

export function random<T>(arr: T[], except: T[] = []): T {
  while (true) {
    const v = arr[Math.floor(Math.random() * arr.length)];
    if (except.indexOf(v) === -1) {
      return v;
    }
  }
}

export function contentEquals<T>(
  a: T[], b: T[],
  equals: (a: T, b: T) => boolean = (a, b) => a === b) {
  if (a.length !== b.length) {
    return false;
  }
  const copy = [...a];
  for (let e of b) {
    const idx = copy.findIndex(c => equals(c, e));
    if (idx === -1) {
      return false;
    }
    copy.splice(idx, 1);
  }
  return true;
}

export function groupBy<T, K extends keyof any>(list: T[], keyGetter: (t: T) => K) {
  const map = new Map<K, T[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}