import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Avatar } from '@self/components/Avatar';
import { Checkbox } from '@self/components/Checkbox';
import { Tab, TabPanel, Tabs } from '@self/components/Tabs';
import { Toolbar } from '@self/components/Toolbar';
import { useClientsTabStore } from '@self/lib/hooks/useClientsTabStore';
import { getOrders } from '@self/lib/services/getOrders';
import { getProperty } from '@self/lib/services/getProperty';
import { Themed } from '@self/lib/types';
import { format } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Paperclip, PhoneCall, PhoneMissed, PhoneOff } from 'react-feather';
import { useQuery } from 'react-query';
import tw from 'twin.macro';
import shallow from 'zustand/shallow';

const URL = 'https://picsum.photos/200/200';

interface Props {
  initialData: any;
}

let ClientsPage: NextPage<Props> = (props) => {
  let { initialData } = props;
  let [activeTab, setActiveTab] = useClientsTabStore(
    ({ activeTab, setActiveTab }) => [activeTab, setActiveTab],
    shallow,
  );
  let [active, setActive] = useState(false);
  let { status, data } = useQuery('ordersData', getOrders, {
    initialData: initialData,
  });
  let { status: propertyStatus, data: propertyData } = useQuery('propertyData', getProperty, {
    initialData: [],
  });

  return (
    <>
      <Head>
        <title>Clients | Dashboard</title>
      </Head>

      <div>
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
          <Tab label="Requests"></Tab>
          <Tab label="Property"></Tab>
          <Tab label="Clients"></Tab>
          <Tab label="Deals"></Tab>
        </Tabs>

        <div
          css={css`
            ${tw`p-2`}

            @media (min-width: 768px) {
              ${tw`p-4`}
            }
          `}
        >
          <TabPanel value={activeTab} index={1}>
            <Toolbar></Toolbar>
            <ul
              css={css`
                > * {
                  ${tw`mb-4`}
                }
              `}
            >
              {propertyData.map((item, i) => (
                <li
                  key={item.userId}
                  css={(theme) => css`
                    ${tw`grid rounded shadow-xl`}
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
                      grid-template-columns: repeat(2, auto) minmax(auto, 1.5fr) repeat(2, 1fr) 1.25fr auto;
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
                    <Checkbox
                      animate
                      checked={active}
                      onChange={() => setActive(!active)}
                    ></Checkbox>
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
                    <Paperclip></Paperclip>
                  </DataCell>
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel value={activeTab} index={0}>
            <Toolbar></Toolbar>

            <div
              css={(theme) => css`
                color: ${theme.colors.textItem};
              `}
            >
              <div
                css={(theme) => css`
                  ${tw`hidden`}
                  color: ${theme.colors.textItemTitle};

                  @media (min-width: 768px) {
                    ${tw`grid`}
                    grid-template-columns: auto repeat(6, 1fr);
                    justify-items: center;
                  }
                `}
              >
                <div>Status</div>
                <div>Phone</div>
                <div>Date</div>
                <div>Curator</div>
                <div>Duration</div>
                <div>Recording</div>
                <div>Action</div>
              </div>
              {data.map((item) => (
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
                    {item.status === 'completed' && <SuccessIcon as={PhoneCall}></SuccessIcon>}
                    {item.status === 'no-response' && <ErrorIcon as={PhoneMissed}></ErrorIcon>}
                    {item.status === 'busy' && <ErrorIcon as={PhoneOff}></ErrorIcon>}
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
                    {item.status === 'completed' && <Button>Add</Button>}
                    {item.status === 'no-response' && <Button>Call Back</Button>}
                    {item.status === 'busy' && <Button>Call Back</Button>}
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </div>
    </>
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

let PlayIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 10 10" width="24">
      <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth=".5"></circle>
      <polyline
        points="0 0 0 10 8 5 0 0"
        fill="currentColor"
        css={css`
          transform-origin: center;
          transform: scale(0.35) translateX(2px);
        `}
      ></polyline>
    </svg>
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

export let getServerSideProps: GetServerSideProps<Props> = async () => {
  let data = await getOrders();
  return { props: { initialData: data } };
};

export default ClientsPage;
