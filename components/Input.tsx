import { css } from '@emotion/core';
import { ThemedCSS } from '@self/lib/types';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface Props
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export let Input: React.FC<Props> = (props) => {
  return (
    <input
      css={
        ((theme) => css`
          ${tw`p-2 rounded`}
          background: ${theme.colors.bgInput};
          color: ${theme.colors.textInput};

          ::placeholder {
            color: ${theme.colors.textInputPlaceholder};
          }
        `) as ThemedCSS
      }
      {...props}
    />
  );
};
