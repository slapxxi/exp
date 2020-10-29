import { css } from '@emotion/core';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import tw from 'twin.macro';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export let Button: React.FunctionComponent<Props> = (props) => {
  let { children, ...rest } = props;

  return (
    <button
      css={(theme) => css`
        ${tw`p-2 px-4 rounded shadow`}
        background: ${theme.colors.bgButton};
        color: ${theme.colors.textButton};
        transition: transform 0.2s;

        :active {
          transform: translateY(2px);
        }
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
