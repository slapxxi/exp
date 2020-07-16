/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import React from 'react';

interface Props {
  loading?: boolean;
  className?: string;
}

let animation = keyframes`
0% {
  background-position: 100% 0;
}

100%{
  background-position: -100% 0;
}
`;

let LoadingBg: React.FunctionComponent<Props> = (props) => {
  let { className, loading = false, children } = props;

  if (!loading) {
    return children as any;
  }

  return (
    <div
      className={className}
      css={css`
        position: relative;
        box-sizing: border-box;
        padding: 0 !important;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          border-radius: 2px;
          background: hsl(200, 10%, 70%, 0.3);
          background: linear-gradient(to right, #f0f0f0 15%, #ffffff 30%, #f0f0f0 45%);
          /* background-size: 1000px 640px; */
          background-size: 200%;
          animation-duration: 1.8s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: ${animation};
          animation-timing-function: linear;
        }

        & > * {
          opacity: 0;
          margin: 0;
          padding: 0;
        }
      `}
    >
      {children}
    </div>
  );
};

export default LoadingBg;
