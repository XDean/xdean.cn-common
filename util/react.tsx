import React, {ComponentType, FunctionComponent, ReactNode} from 'react';

export function notSSR<T, >(Comp: ComponentType<T>): FunctionComponent<T> {
  return (props: T) => {
    if (typeof window !== 'undefined') {
      return <Comp {...props}/>;
    } else {
      return null;
    }
  };
}

export type PropsOf<T extends (...args: any[]) => ReactNode> = Parameters<T>[0]

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function mergeDestructor(...arr: (void | (() => void))[]): () => void {
  return () => {
    arr.forEach((e) => e && e());
  };
}
