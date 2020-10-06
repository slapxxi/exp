import { css, keyframes } from '@emotion/core';
import { ThemedCSS } from '@self/lib/types';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { animated as a, useSpring } from 'react-spring';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  animate?: boolean;
  onClick?: () => void;
}

export let Checkbox: React.FC<Props> = (props) => {
  let { checked, animate, onClick, className, ...rest } = props;
  let ap = useSpring({
    progress: checked ? 0 : 21,
    immediate: !animate,
  });

  return (
    <svg
      viewBox="0 0 10 10"
      onClick={onClick}
      style={{ overflow: 'visible' }}
      css={css`
        width: 20px;
      `}
      className={className}
    >
      <defs>
        <filter id="f4" x="-12%" y="-12%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx=".5" dy=".5" />
          <feColorMatrix
            result="matrixOut"
            in="offOut"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="0.8" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>

      <a.rect
        width="7.5"
        height="7.5"
        x="1.2"
        y="1.5"
        rx="1"
        ry="1"
        css={(theme) => css`
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.2;
          stroke: ${theme.colors.bgCheckbox};
          transform-origin: center;
          animation: ${animate && (checked ? scaleUp : scaleDown)} 0.3s;
          animation-timing-function: ease-in;
        `}
      ></a.rect>
      <a.polyline
        points="1 3 4.5 6.5 9.5 0.5"
        strokeDashoffset={ap.progress}
        css={
          ((theme) => css`
            filter: ${theme.type === 'dark' ? 'url(#f4)' : 'none'};
            fill: none;
            stroke: ${theme.colors.textCheckbox};
            stroke-dasharray: 20;
            stroke-linejoin: round;
            stroke-linecap: round;
            stroke-width: ${theme.type === 'light' ? 1.8 : 1.3};
          `) as ThemedCSS
        }
      ></a.polyline>
    </svg>
  );
};

let scaleUp = keyframes`
0% {
  transform: scale(1)
}

50% {
  transform: scale(1.15)
}

100% {
  transform: scale(1)
}
`;

let scaleDown = keyframes`
0% {
  transform: scale(1)
}

60% {
  transform: scale(0.85)
}

100% {
  transform: scale(1)
}
`;
