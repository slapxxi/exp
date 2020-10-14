import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Avatar } from '@self/components/Avatar';
import { Checkbox } from '@self/components/Checkbox';
import { Tab, TabPanel, Tabs } from '@self/components/Tabs';
import { Toolbar } from '@self/components/Toolbar';
import { getOrders } from '@self/lib/services/getOrders';
import { Themed } from '@self/lib/types';
import { format } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { Fragment, useState } from 'react';
import { Paperclip, PhoneCall, PhoneMissed, PhoneOff } from 'react-feather';
import { useQuery } from 'react-query';
import tw from 'twin.macro';

const URL = 'https://picsum.photos/200/200';

interface Props {
  initialData: any;
}

let ClientsPage: NextPage<Props> = (props) => {
  let { initialData } = props;
  let [activeTab, setActiveTab] = useState(0);
  let [active, setActive] = useState(false);
  let { status, data } = useQuery('ordersData', getOrders, { initialData: initialData });

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
            ${tw`p-4`}
          `}
        >
          <TabPanel value={activeTab} index={1}>
            <Toolbar></Toolbar>
            <ul>
              <li
                css={(theme) => css`
                  ${tw`grid rounded shadow-xl`}
                  background: ${theme.colors.bgItem};
                  grid-template-columns: repeat(2, auto) minmax(10%, 1.5fr) repeat(5, 1fr) 1.25fr auto;
                  grid-template-rows: repeat(2, minmax(70px, 1fr));
                  grid-auto-rows: 0px;
                  color: ${theme.colors.textItem};

                  > * {
                    border-right: 1px solid ${theme.colors.bgItemActive};

                    &:last-child {
                      border: 0;
                    }
                  }
                `}
              >
                <label
                  css={(theme) => css`
                    ${tw`flex p-4 flex-col justify-center rounded`}
                    grid-row: span 2;

                    :hover {
                      background: ${theme.colors.bgItemActive};
                    }
                  `}
                >
                  <Checkbox animate checked={active} onChange={() => setActive(!active)}></Checkbox>
                </label>
                <div
                  css={css`
                    ${tw`flex flex-col p-4 justify-center items-center`}
                    grid-row: span 2;
                  `}
                >
                  <Avatar src={URL} width={50}></Avatar>
                  <span>ID 12345</span>
                </div>
                <div
                  css={css`
                    ${tw`flex p-4 flex-col justify-center`}
                  `}
                >
                  Slava Pavlutin
                </div>
                <div
                  css={css`
                    ${tw`flex p-4 flex-col justify-center`}
                    grid-row: 2;
                    grid-column: 3;
                  `}
                >
                  <span>8 931 300 88 99</span>
                  <DataLink>New York</DataLink>
                </div>
                <DataCell>
                  <Title>Amount</Title>
                  <span>from 3 000 000</span>
                </DataCell>
                <DataCell
                  css={css`
                    grid-column: 4;
                    grid-row: 2;
                  `}
                >
                  <Title>Size</Title>
                  <span>
                    from 30m<sup>2</sup>
                  </span>
                </DataCell>
                <DataCell>
                  <Title>Created</Title>
                  <span>28.03.20</span>
                </DataCell>
                <DataCell
                  css={css`
                    grid-row: 2;
                    grid-column: 5;
                  `}
                >
                  <Title>Updated</Title>
                  <span>28.03.20</span>
                </DataCell>
                <DataCell>
                  <Title>Wants</Title>
                  <span>Sell</span>
                </DataCell>
                <DataCell
                  css={css`
                    grid-row: 2;
                    grid-column: 6;
                  `}
                >
                  <Title>Type</Title>
                  <span>House</span>
                </DataCell>
                <DataCell>
                  <Title>Met</Title>
                  <span>28.10.2020</span>
                </DataCell>
                <DataCell
                  css={css`
                    grid-row: 2;
                    grid-column: 7;
                  `}
                >
                  <Title>Payment</Title>
                  <span>Unknown</span>
                </DataCell>
                <DataCell>
                  <Title>Status</Title>
                  <span>Ready</span>
                </DataCell>
                <DataCell
                  css={css`
                    grid-row: 2;
                    grid-column: 8;
                  `}
                >
                  <Title>Reminders</Title>
                  <span>None</span>
                </DataCell>
                <DataCell
                  css={css`
                    ${tw`p-4`}
                    grid-row: span 2;
                  `}
                >
                  Salamatin Andrey
                </DataCell>
                <DataCell
                  css={css`
                    ${tw`p-4`}
                    grid-row: span 2;
                  `}
                >
                  <Paperclip></Paperclip>
                </DataCell>
              </li>
            </ul>
          </TabPanel>

          <TabPanel value={activeTab} index={0}>
            <Toolbar></Toolbar>

            {/* Table */}
            <table
              css={(theme) =>
                css`
                  ${tw`w-full`}
                  color: ${theme.colors.textTableHeader};
                `
              }
            >
              <thead>
                <tr
                  css={css`
                    ${tw`shadow`}
                  `}
                >
                  <HCell>Status</HCell>
                  <HCell>Phone Number</HCell>
                  <HCell>Date</HCell>
                  <HCell>Curator</HCell>
                  <HCell>Duration</HCell>
                  <HCell colSpan={2}>Recording</HCell>
                </tr>
                <Spacer></Spacer>
              </thead>
              <tbody>
                {status === 'success' &&
                  data.map((item, i) => (
                    <Fragment key={item.id}>
                      <Row>
                        <Cell
                          title={item.status}
                          css={css`
                            text-align: center;
                            vertical-align: middle;
                          `}
                        >
                          {item.status === 'completed' && (
                            <SuccessIcon as={PhoneCall}></SuccessIcon>
                          )}
                          {item.status === 'no-response' && (
                            <ErrorIcon as={PhoneMissed}></ErrorIcon>
                          )}
                          {item.status === 'busy' && <ErrorIcon as={PhoneOff}></ErrorIcon>}
                        </Cell>
                        <Cell>{item.phoneNumber}</Cell>
                        <Cell>{format(new Date(item.callDate), 'dd.MM.yyyy hh:mm:ss')}</Cell>
                        <Cell>{item.curator}</Cell>
                        <Cell>{item.duration ? ~~(item.duration / 60) : 'N/A'}</Cell>
                        <Cell>
                          <PlayIcon></PlayIcon>
                        </Cell>
                        <Cell>
                          {item.status === 'completed' && <Button>Add</Button>}
                          {item.status === 'no-response' && <Button>Call Back</Button>}
                          {item.status === 'busy' && <Button>Call Back</Button>}
                        </Cell>
                      </Row>
                      <Spacer key={i}></Spacer>
                    </Fragment>
                  ))}
              </tbody>
            </table>
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

let Row = styled.tr<Themed>`
  ${tw`rounded shadow`}
  background: ${({ theme }) => theme.colors.bgItem};
  color: ${({ theme }) => theme.colors.textItem};
`;

let HCell = styled.th<Themed>`
  ${tw`p-4 sticky text-left`}
  top: 60px;
  background: ${(props) => props.theme.colors.bgItem};

  &:first-of-type {
    ${tw`rounded-tl rounded-bl`}
  }

  &:last-of-type {
    ${tw`rounded-tr rounded-br`}
  }
`;

let Cell = styled.td`
  ${tw`py-4 px-4`}

  &:first-of-type {
    ${tw`rounded-tl rounded-bl`}
  }

  &:last-of-type {
    ${tw`rounded-tr rounded-br`}
  }
`;

let Button = styled.button<Themed>`
  ${tw`py-1 px-2 rounded`}
  border: 1px solid ${(props) => props.theme.colors.textTableHeader};
`;

let Spacer = styled.tr`
  ${tw`h-4`}
`;

export let getServerSideProps: GetServerSideProps<Props> = async () => {
  let data = await getOrders();
  return { props: { initialData: data } };
};

export default ClientsPage;
