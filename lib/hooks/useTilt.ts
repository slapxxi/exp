import { useEffect, useRef } from 'react';

export function useTilt(active: boolean) {
  const ref = useRef();

  useEffect(() => {
    let state: any = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    if (ref.current && active) {
      let el: HTMLElement = ref.current;

      const handleMouseMove = (e: MouseEvent) => {
        if (el) {
          if (!state.rect) {
            state.rect = el.getBoundingClientRect();
          }

          state.mouseX = e.clientX;
          state.mouseY = e.clientY;

          let px = (state.mouseX - state.rect.left) / state.rect.width;
          let py = (state.mouseY - state.rect.top) / state.rect.height;

          el.style.setProperty('--px', `${px}`);
          el.style.setProperty('--py', `${py}`);
        }
      };

      el.addEventListener('mousemove', handleMouseMove);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [active]);

  return ref;
}
