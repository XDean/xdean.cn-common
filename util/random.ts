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

export function randomInt(start?: number, end?: number) {
  return Math.floor(randomFloat(start, end));
}