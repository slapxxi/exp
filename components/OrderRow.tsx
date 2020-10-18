import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { OrderItem, OrderItemStatus, Serialized, Themed } from '@self/lib/types';
import { format } from 'date-fns';
import React from 'react';
import { PhoneCall, PhoneMissed, PhoneOff } from 'react-feather';
import tw from 'twin.macro';
import { PlayIcon } from './PlayIcon';

interface Props {
  item: Serialized<OrderItem>;
}

export let OrderRow: React.FC<Props> = (props) => {
  let { item } = props;
  return (
    <div
      key={item.id}
      css={(theme) => css`
        ${tw`grid shadow rounded my-2`}
        background: ${theme.colors.bgItem};
        grid-template-columns: auto repeat(2, 1fr) auto;
        grid-template-rows: repeat(3, 1fr);

        @media (min-width: 768px) {
          grid-template-columns: auto repeat(6, 1fr);
          grid-template-rows: 1fr;
          align-items: center;
          justify-items: center;
        }
      `}
    >
      <div
        css={css`
          ${tw`p-2`}
          grid-column: 1;
          grid-row: span 3;
          align-self: center;
        `}
      >
        {item.status === OrderItemStatus.completed && <SuccessIcon as={PhoneCall}></SuccessIcon>}
        {item.status === OrderItemStatus.noResponse && <ErrorIcon as={PhoneMissed}></ErrorIcon>}
        {item.status === OrderItemStatus.busy && <ErrorIcon as={PhoneOff}></ErrorIcon>}
      </div>
      <div
        css={css`
          ${tw`p-2`}
          grid-column: 2;
        `}
      >
        {item.phoneNumber}
      </div>
      <div
        css={(theme) => css`
          grid-column: 2;
          grid-row: 4;
          align-self: center;
          color: ${theme.colors.textItemTitle};

          @media (min-width: 768px) {
            grid-column: 4;
            grid-row: 1;
            color: ${theme.colors.textItem};
          }
        `}
      >
        {item.curator}
      </div>
      <div
        css={(theme) => css`
          grid-column: 3;
          grid-row: 4;
          align-self: center;
          color: ${theme.colors.textItemTitle};

          @media (min-width: 768px) {
            grid-column: 3;
            grid-row: 1;
            color: ${theme.colors.textItem};
          }
        `}
      >
        {format(new Date(item.callDate), 'dd.MM.yyyy hh:mm:ss')}
      </div>
      <div
        css={css`
          grid-column: 3;
          grid-row: 2;
          align-self: center;
          justify-self: end;

          @media (min-width: 768px) {
            grid-column: 5;
            grid-row: 1;
            justify-self: center;
          }
        `}
      >
        {item.duration ? ~~(item.duration / 60) : 'N/A'}
      </div>
      <div
        css={css`
          grid-column: 2;
          align-self: center;
          @media (min-width: 768px) {
            grid-column: 6;
          }
        `}
      >
        <PlayIcon></PlayIcon>
      </div>
      <div
        css={css`
          ${tw`p-2`}
          grid-column: 4;
          grid-row: 1 / span 3;
          align-self: center;

          @media (min-width: 768px) {
            grid-column: 7;
            grid-row: 1;
          }
        `}
      >
        {item.status === OrderItemStatus.completed && <Button>Add</Button>}
        {item.status === OrderItemStatus.busy && <Button>Call Back</Button>}
        {item.status === OrderItemStatus.noResponse && <Button>Call Back</Button>}
      </div>
    </div>
  );
};

let SuccessIcon = styled.div<Themed>`
  ${tw`inline-block`}
  color: ${({ theme }) => theme.colors.success};
  stroke-width: 1;
`;

let ErrorIcon = styled.div<Themed>`
  ${tw`inline-block`}
  color: ${({ theme }) => theme.colors.error};
  stroke-width: 1;
`;

let Button = styled.button<Themed>`
  ${tw`py-1 px-2 rounded`}
  border: 1px solid ${(props) => props.theme.colors.textTableHeader};
`;
