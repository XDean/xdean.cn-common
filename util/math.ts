export function toRange(val: number, [min, max]: [number, number]) {
  return Math.min(max, Math.max(min, val));
}