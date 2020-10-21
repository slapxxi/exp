import { css } from '@emotion/core';
import React, { SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGSVGElement> {
  src?: string;
}

export let Avatar: React.FC<Props> = (props) => {
  let { src, ...rest } = props;

  return (
    <>
      <svg viewBox="0 0 100 100" {...rest}>
        <circle
          cx="50"
          cy="50"
          r="50"
          css={(theme) => css`
            fill: ${theme.colors.textHeader};
          `}
        ></circle>
        <image href={src} width="100" height="100" mask="url(#avatar-mask)" />
      </svg>
    </>
  );
};
