import { css } from '@emotion/core';
import { ThemedCSS } from '@self/lib/types';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { animated as a, useSpring } from 'react-spring';
import tw from 'twin.macro';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  animate?: boolean;
  onClick?: () => void;
}

export let Checkbox: React.FC<Props> = (props) => {
  let { checked, animate, onClick, className, ...rest } = props;
  let ap = useSpring({
    progress: checked ? 0 : 21,
    size: checked ? 1 : 0,
    config: {
      tension: checked ? 170 : 320,
    },
    immediate: !animate,
  });

  return (
    <label
      css={css`
        ${tw`relative`}
      `}
    >
      <input
        type="checkbox"
        checked={checked}
        css={css`
          ${tw`absolute opacity-0`}
          top: 0;
        `}
        {...rest}
      />
      <svg
        viewBox="0 0 10 10"
        css={css`
          ${tw`inline`}
          overflow: visible;
          width: 20px;
          transform: translateY(-2px);
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
          style={{
            transform: ap.size.interpolate((v) => `scale(${1 + Math.sin(v * Math.PI) / 4})`),
          }}
          css={(theme) => css`
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 1.2;
            stroke: ${theme.colors.bgCheckbox};
            transform-origin: center;
          `}
        ></a.rect>
        <a.polyline
          points="1.5 4 4 6.5 9 1.5"
          strokeDashoffset={ap.progress}
          css={
            ((theme) => css`
              filter: ${theme.type === 'dark' ? 'url(#f4)' : 'none'};
              fill: none;
              stroke: ${theme.colors.textCheckbox};
              stroke-dasharray: 20;
              stroke-linejoin: round;
              stroke-linecap: round;
              stroke-width: ${theme.type === 'light' ? 1.6 : 1.3};
            `) as ThemedCSS
          }
        ></a.polyline>
      </svg>
    </label>
  );
};
