export function stringToBoolean(s: string) {
  switch (s.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    default:
      return false;
  }
}

export type Data<T> =
  { type: 'null' }
  | { type: 'loading' }
  | { type: 'ready', value: T }
  | { type: 'error', error: string };

export function caseNever<T>(_: never): T {
  throw new Error('case should never reach');
}


