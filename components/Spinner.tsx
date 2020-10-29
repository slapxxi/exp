import { css, keyframes } from '@emotion/core';

interface Props {
  size?: number;
}

let animation = keyframes`
0% {
  transform: rotate(0);
}

100% {
  transform: rotate(360deg);
}
`;

export let Spinner: React.FC<Props> = (props) => {
  let { size = 24 } = props;

  return (
    <svg
      viewBox="0 0 100 100"
      css={css`
        width: ${size}px;
        animation: ${animation} linear 1s infinite;
        will-change: transform;
      `}
    >
      <defs>
        <radialGradient id="spinner-grad" fy="0.2">
          <stop
            offset="60%"
            css={(theme) => css`
              stop-color: ${theme.colors.accent};
            `}
          ></stop>
          <stop
            stopColor="#93f0"
            offset="100%"
            css={(theme) => css`
              --text-opacity: 0;
              stop-color: ${theme.colors.accentA};
            `}
          ></stop>
        </radialGradient>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="40"
        css={css`
          /* fill: url(#spinner-grad); */
          fill: none;
          stroke: url(#spinner-grad);
          stroke-width: 20;
        `}
      ></circle>
    </svg>
  );
};
