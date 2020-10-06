import { useEffect, useRef } from 'react';

export function useOutsideClick(fn: () => void) {
  let ref = useRef<any>();

  useEffect(() => {
    function handler(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }

    if (ref.current) {
      document.body.addEventListener('mousedown', handler);
      document.body.addEventListener('touchstart', handler);
    }

    return () => {
      document.body.removeEventListener('mousedown', handler);
      document.body.removeEventListener('touchstart', handler);
    };
  }, [fn]);

  return ref;
}
