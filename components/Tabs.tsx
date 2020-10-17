import { css } from '@emotion/core';
import { ThemedCSS } from '@self/lib/types';
import { Children, cloneElement, isValidElement, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';

interface TabsProps {
  value: number;
  onChange: (index: number) => void;
}

export let Tabs: React.FC<TabsProps> = (props) => {
  let { children, value, onChange } = props;
  let mdSize = useMediaQuery({ minWidth: 768 });
  let lgSize = useMediaQuery({ minWidth: 1024 });
  let div = useMemo(() => {
    if (lgSize) {
      return 0.2;
    }
    if (mdSize) {
      return 0.4;
    }
    return 0.7;
  }, [mdSize, lgSize]);
  let count = Children.count(children);
  let decoratorWidth = (100 / count) * div;
  let decoratorOffset = calcDecoratorOffset(decoratorWidth, count, value);

  return (
    <div
      css={(theme) => css`
        ${tw`shadow`}
        top: 0;
        margin: auto;
        background: ${theme.colors.bgItem};
      `}
    >
      <div
        css={
          ((theme) => css`
            ${tw`flex relative top-0 m-auto`}
            background: ${theme.colors.bgItem};
            min-height: 60px;
            max-width: 768px;

            ::after {
              ${tw`absolute bottom-0`}
              content:  '';
              height: 3px;
              background: ${theme.gradients.accent};
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
        ${tw`flex flex-1 items-center justify-center cursor-pointer`}
        color: ${active ? theme.colors.accent : theme.colors.textItem};

        :hover {
          background: ${theme.colors.bgItemActive};
        }
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
