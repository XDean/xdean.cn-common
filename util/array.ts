export async function toArray<T>(iterator: AsyncGenerator<T>) {
  const arr = []
  for await (const entry of iterator) {
    arr.push(entry)
  }
  return arr
}

export function range(start: number, end: number) {
  return Array.from(new Array(end - start).keys()).map(e => e + start)
}


export function contentEquals<T>(
  a: T[], b: T[],
  equals: (a: T, b: T) => boolean = (a, b) => a === b) {
  if (a.length !== b.length) {
    return false
  }
  const copy = [...a]
  for (let e of b) {
    const idx = copy.findIndex(c => equals(c, e));
    if (idx === -1) {
      return false
    }
    copy.splice(idx, 1)
  }
  return true
}