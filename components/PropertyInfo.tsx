import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { PropertyItem, Serialized, Themed } from '@self/lib/types';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Archive,
  Calendar,
  MessageSquare,
  Paperclip,
  Settings,
} from 'react-feather';
import tw from 'twin.macro';
import { Avatar } from './Avatar';
import { Checkbox } from './Checkbox';
import { Dropdown } from './Dropdown';

interface Props {
  item: Serialized<PropertyItem>;
  selected?: boolean;
  onSelect?: () => void;
}

const URL = 'https://picsum.photos/200/200';

export let PropertyInfo: React.FC<Props> = (props) => {
  let { item, selected, onSelect } = props;
  let [active, setActive] = useState(false);
  let [rootEl, setRootEl] = useState();
  let handleRef = useCallback((elem) => {
    setRootEl(elem);
  }, []);

  return (
    <li
      key={item.userId}
      css={(theme) => css`
        ${tw`relative grid rounded shadow-xl`}
        border: 1px solid transparent;
        ${selected && `border-color: ${theme.colors.accent}`};
        background: ${theme.colors.bgItem};
        grid-template-columns: repeat(2, auto) minmax(auto, 1.5fr) 1fr 1.25fr auto;
        grid-template-rows: repeat(10, minmax(70px, auto));
        color: ${theme.colors.textItem};

        > * {
          border-right: 1px solid ${theme.colors.bgItemActive};

          &:last-child {
            border: 0;
          }
        }

        @media (min-width: 768px) {
          grid-template-columns: repeat(2, auto) minmax(auto, 1.5fr) repeat(2, 1fr) 1.25fr [col-start] auto [col-end];
          grid-template-rows: repeat(3, minmax(70px, auto));
        }

        @media (min-width: 1024px) {
          grid-template-columns: repeat(2, auto) minmax(auto, 1.5fr) repeat(5, 1fr) 1.25fr auto;
          grid-template-rows: repeat(2, minmax(70px, auto));
        }
      `}
    >
      <label
        css={(theme) => css`
          ${tw`flex p-4 flex-col justify-center rounded`}
          grid-row: span 10;

          :hover {
            background: ${theme.colors.bgItemActive};
          }
        `}
      >
        <Checkbox animate checked={selected} onChange={onSelect}></Checkbox>
      </label>
      <div
        css={css`
          ${tw`flex flex-col p-4 justify-center items-center`}
          grid-row: span 10;
        `}
      >
        <Avatar src={URL} width={50}></Avatar>
        <span>ID {item.userId}</span>
      </div>
      <div
        css={css`
          ${tw`flex p-4 flex-col justify-center`}
          grid-column: 3;
          grid-row: span 5;

          @media (min-width: 768px) {
            grid-column: 3;
            grid-row: 1;
          }

          @media (min-width: 1024px) {
            grid-row: 1;
          }
        `}
      >
        {item.name}
      </div>
      <div
        css={css`
          ${tw`flex p-4 flex-col justify-center`}
          grid-column: 3;
          grid-row: span 5;

          @media (min-width: 768px) {
            grid-column: 4 / span 2;
            grid-row: 1;
          }

          @media (min-width: 1024px) {
            grid-column: 3;
            grid-row: 2;
          }
        `}
      >
        <span>{item.phoneNumber}</span>
        <DataLink>{item.location}</DataLink>
      </div>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 1;

          @media (min-width: 768px) {
            grid-column: 3;
            grid-row: 2;
          }

          @media (min-width: 1024px) {
            grid-column: 4;
            grid-row: 1;
          }
        `}
      >
        <Title>Amount</Title>
        <span>from {item.amount}</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 2;

          @media (min-width: 768px) {
            grid-column: 3;
            grid-row: 3;
          }

          @media (min-width: 1024px) {
            grid-column: 4;
            grid-row: 2;
          }
        `}
      >
        <Title>Size</Title>
        <span>
          from {item.size}m<sup>2</sup>
        </span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 3;

          @media (min-width: 768px) {
            grid-column: 4;
            grid-row: 2;
          }

          @media (min-width: 1024px) {
            grid-column: 5;
            grid-row: 1;
          }
        `}
      >
        <Title>Created</Title>
        <span>{format(new Date(item.createdAt), 'dd.MM.y')}</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 4;

          @media (min-width: 768px) {
            grid-column: 4;
            grid-row: 3;
          }

          @media (min-width: 1024px) {
            grid-column: 5;
            grid-row: 2;
          }
        `}
      >
        <Title>Updated</Title>
        <span>{format(new Date(item.updatedAt), 'dd.MM.y')}</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 5;

          @media (min-width: 768px) {
            grid-column: 5;
            grid-row: 2;
          }

          @media (min-width: 1024px) {
            grid-column: 6;
            grid-row: 1;
          }
        `}
      >
        <Title>Wants</Title>
        <span>{item.wants}</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 6;

          @media (min-width: 768px) {
            grid-column: 5;
            grid-row: 3;
          }

          @media (min-width: 1024px) {
            grid-column: 6;
            grid-row: 2;
          }
        `}
      >
        <Title>Type</Title>
        <span>{item.type}</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 7;

          @media (min-width: 768px) {
            grid-column: 6;
            grid-row: 2;
          }

          @media (min-width: 1024px) {
            grid-column: 7;
            grid-row: 1;
          }
        `}
      >
        <Title>Met</Title>
        <span>{format(new Date(item.met), 'dd.MM.y')}</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 8;

          @media (min-width: 768px) {
            grid-column: 6;
            grid-row: 3;
          }

          @media (min-width: 1024px) {
            grid-column: 7;
            grid-row: 2;
          }
        `}
      >
        <Title>Payment</Title>
        <span>Unknown</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 9;

          @media (min-width: 768px) {
            grid-column: 7;
            grid-row: 2;
          }

          @media (min-width: 1024px) {
            grid-column: 8;
            grid-row: 1;
          }
        `}
      >
        <Title>Status</Title>
        <span>Ready</span>
      </DataCell>
      <DataCell
        css={css`
          grid-column: 4;
          grid-row: 10;

          @media (min-width: 768px) {
            grid-column: 7;
            grid-row: 3;
          }

          @media (min-width: 1024px) {
            grid-column: 8;
            grid-row: 2;
          }
        `}
      >
        <Title>Reminders</Title>
        <span>{item.reminders}</span>
      </DataCell>
      <DataCell
        css={css`
          ${tw`p-4`}
          grid-column: 5;
          grid-row: 1/11;
          justify-content: center;

          @media (min-width: 768px) {
            grid-column: 6;
            grid-row: 1;
          }

          @media (min-width: 1024px) {
            grid-column: 9;
            grid-row: span 2;
          }
        `}
      >
        {item.curator}
      </DataCell>
      <DataCell
        css={css`
          ${tw`p-4`}
          grid-column: 6;
          grid-row: 1/11;

          @media (min-width: 768px) {
            grid-column: 7;
            grid-row: 1;
          }

          @media (min-width: 1024px) {
            grid-column: 10;
            grid-row: 1 / span 2;
          }
        `}
      >
        <Paperclip ref={handleRef} onClick={() => setActive(!active)}></Paperclip>
        <Dropdown animate anchorElement={rootEl} open={active} onClose={() => setActive((a) => !a)}>
          <ul
            css={(theme) => css`
              ${tw`grid`}
              color: ${theme.colors.textItem};
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(2, 1fr);

              > * {
                > button {
                  ${tw`flex w-full p-4 text-left items-center`}

                  > * {
                    color: ${theme.colors.textItemTitle};
                  }

                  &:hover {
                    background: ${theme.colors.bgDropdownActive};
                  }
                }
              }
            `}
          >
            <li>
              <button>
                <Activity></Activity>
              </button>
            </li>
            <li>
              <button>
                <AlertTriangle></AlertTriangle>
              </button>
            </li>
            <li>
              <button>
                <MessageSquare></MessageSquare>
              </button>
            </li>
            <li>
              <button>
                <Calendar></Calendar>
              </button>
            </li>
            <li>
              <button>
                <Archive></Archive>
              </button>
            </li>
            <li>
              <button>
                <Settings></Settings>
              </button>
            </li>
          </ul>
        </Dropdown>
      </DataCell>
    </li>
  );
};

let DataLink = styled.span<Themed>`
  color: ${({ theme }) => theme.colors.accent};
`;

let DataCell = styled.div`
  ${tw`flex flex-col items-center justify-center`}
`;

let Title = styled.span<Themed>`
  color: ${(props) => props.theme.colors.textItemTitle};
`;
