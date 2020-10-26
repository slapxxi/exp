import { css } from '@emotion/core';
import { useMounted } from '@self/lib/hooks/useMounted';
import { useOutsideClick } from '@self/lib/hooks/useOutsideClick';
import { useLayoutEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { animated as a, useSpring } from 'react-spring';
import tw from 'twin.macro';

interface Props {
  open?: boolean;
  onClose?: () => void;
  animate?: boolean;
  anchorElement?: HTMLElement;
  className?: string;
  fixed?: boolean;
}

type Position = {
  top: string | number;
  left: string | number;
};

export let Dropdown: React.FC<Props> = (props) => {
  let { children, animate, fixed, anchorElement, open, onClose, className } = props;
  let mounted = useMounted();
  let [direction, setDirection] = useState('bottom');
  let [position, setPosition] = useState<Position>(() => ({
    top: 0,
    left: 0,
  }));
  let dropdownRef = useOutsideClick((target) => {
    if (open && !anchorElement.contains(target)) {
      onClose?.();
    }
  });
  let rootEl = useMemo(() => {
    if (mounted) {
      return document.querySelector('body');
    }
  }, [mounted]);
  let ap = useSpring({
    s: open ? 1 : 0,
    y: open ? 0 : -100,
    config: {
      friction: open ? 21 : 26,
      tension: 200,
    },
    immediate: !animate,
  });

  useLayoutEffect(() => {
    if (mounted && anchorElement && open) {
      let dropdownEl = dropdownRef.current;
      dropdownEl.style.transform = '';
      dropdownEl.style.top = 0;
      dropdownEl.style.left = 0;
      let aRect = anchorElement.getBoundingClientRect();
      let dRect = dropdownEl.getBoundingClientRect();
      let clientWidth = rootEl.clientWidth;
      let clientHeight = rootEl.clientHeight;
      let scrollTop = window.scrollY;

      let nextPosition = {
        top: fixed ? aRect.top + aRect.height : aRect.top + aRect.height + scrollTop,
        left: aRect.left,
      };

      if (dRect.width + aRect.left > clientWidth) {
        nextPosition.left = aRect.right - dRect.width;
      }

      if (
        dRect.height + aRect.bottom > clientHeight &&
        aRect.top > clientHeight - aRect.top - aRect.height
      ) {
        nextPosition.top = fixed ? aRect.top - dRect.height : scrollTop - dRect.height + aRect.top;
        setDirection('top');
      } else {
        setDirection('bottom');
      }

      setPosition(nextPosition);
      dropdownEl.style.top = '';
      dropdownEl.style.left = '';
    }
  }, [mounted, anchorElement, open]);

  if (mounted && anchorElement) {
    return createPortal(
      <a.div
        ref={dropdownRef}
        css={(theme) => css`
          ${tw`absolute rounded shadow-lg z-50 overflow-hidden`}
          ${fixed ? tw`fixed` : tw`absolute`}
          ${position}
          background: ${theme.colors.bgDropdown};
          transform-origin: ${direction === 'bottom' ? 'top left' : 'bottom'};
          will-change: transform;
        `}
        style={{
          transform: ap.s.interpolate((s) => `scale(1,${s})`),
          opacity: ap.s,
        }}
        className={className}
      >
        <a.div
          css={css`
            transform-origin: ${direction === 'bottom' ? 'bottom' : 'top'};
          `}
          style={{
            transform: ap.s.interpolate((s) => `scale(1,${1 / s})`),
            opacity: ap.s,
          }}
        >
          {children}
        </a.div>
      </a.div>,
      rootEl,
    );
  }

  return null;
};
