import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemedCSS } from '@self/lib/types';
import React, { SVGProps } from 'react';
import { Grid, Search } from 'react-feather';
import tw from 'twin.macro';

export let Toolbar: React.FC<any> = () => {
  return (
    <div
      css={
        ((theme) => css`
          ${tw`flex rounded shadow mb-4`}
          min-height: 48px;
          background: ${theme.colors.bgItem};
          color: ${theme.colors.textItem};

          > * {
            border-right: 1px solid ${theme.colors.bgContent};

            &:last-child {
              border: 0;
            }
          }
        `) as ThemedCSS
      }
    >
      <ToolbarItem noPadding>
        <label
          htmlFor="search-orders"
          css={css`
            ${tw`flex items-center px-4`}
          `}
        >
          Search
        </label>
      </ToolbarItem>
      <ToolbarItem
        noPadding
        css={css`
          ${tw`flex-1`}
        `}
      >
        <input
          id="search-orders"
          type="search"
          placeholder="Search..."
          css={
            ((theme) => css`
              ${tw`flex-1 px-4`}
              background: ${theme.colors.bgItem};
              color: ${theme.colors.textItem};

              ::placeholder {
                color: ${theme.colors.textContent};
              }
            `) as ThemedCSS
          }
        ></input>
      </ToolbarItem>
      <ToolbarItem noPadding>
        <button
          css={css`
            ${tw`px-4`}
          `}
        >
          <Search strokeWidth="1.5"></Search>
        </button>
      </ToolbarItem>
      <ToolbarItem noPadding>
        <button
          css={css`
            ${tw`px-4 pr-2`}
          `}
        >
          <StackIcon strokeWidth="1.5"></StackIcon>
        </button>
        <button
          css={css`
            ${tw`px-4 pl-2`}
          `}
        >
          <Grid strokeWidth="1.5"></Grid>
        </button>
      </ToolbarItem>
    </div>
  );
};

let ToolbarItem = styled.div<{ noPadding?: boolean }>`
  ${tw`flex`}
  ${({ noPadding }) => !noPadding && tw`px-4 space-x-2`}
`;

let StackIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 24 24" width="24" strokeWidth="2" {...props}>
      <rect width="18.5" x="2.5" height="6" y="4" stroke="currentColor" fill="none"></rect>
      <rect width="18.5" x="2.5" height="6" y="15" stroke="currentColor" fill="none"></rect>
    </svg>
  );
};
