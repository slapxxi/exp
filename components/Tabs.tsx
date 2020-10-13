import { css } from '@emotion/core';
import { ThemedCSS } from '@self/lib/types';
import { Children, cloneElement, isValidElement } from 'react';
import tw from 'twin.macro';

interface TabsProps {
  value: number;
  onChange: (index: number) => void;
}

const DIV = 3;

export let Tabs: React.FC<TabsProps> = (props) => {
  let { children, value, onChange } = props;
  let count = Children.count(children);
  let decoratorWidth = 100 / count / DIV;
  let decoratorOffset = calcDecoratorOffset(decoratorWidth, count, value);

  return (
    <div
      css={
        ((theme) => css`
          ${tw`flex relative shadow sticky top-0`}
          background: ${theme.colors.bgItem};
          min-height: 60px;

          ::after {
            ${tw`absolute bottom-0`}
            content:  '';
            height: 3px;
            background: ${theme.colors.accent};
            width: ${decoratorWidth}%;
            transform: translate3d(${decoratorOffset}%, 0, 0);
            transition: transform 0.3s;
          }
        `) as ThemedCSS
      }
    >
      {Children.map(children, (c, i) => {
        if (isValidElement(c)) {
          return cloneElement(c, {
            active: i === value,
            onClick: () => {
              onChange(i);
              c.props.onClick?.();
            },
          });
        }

        return null;
      })}
    </div>
  );
};

function calcDecoratorOffset(
  decoratorWidth: number,
  itemsCount: number,
  currentIndex: number,
): number {
  let containerWidth = 100 / itemsCount;
  let remainingSpace = containerWidth / decoratorWidth - 1;
  let result =
    (remainingSpace + currentIndex * (containerWidth / decoratorWidth) - remainingSpace / 2) * 100;
  return result;
}

interface TabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export let Tab: React.FC<TabProps> = (props) => {
  let { active, label, onClick } = props;

  return (
    <div
      css={(theme) => css`
        ${tw`flex flex-1 items-center justify-center px-4 cursor-pointer`}
        color: ${active ? theme.colors.accent : theme.colors.textItem};
      `}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

interface TabPanelProps {
  value: number;
  index: number;
}

export let TabPanel: React.FC<TabPanelProps> = (props) => {
  let { children, value, index } = props;

  if (value === index) {
    return <>{children}</>;
  }

  return null;
};
