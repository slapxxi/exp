import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Avatar } from '@self/components/Avatar';
import { Checkbox } from '@self/components/Checkbox';
import { Tab, TabPanel, Tabs } from '@self/components/Tabs';
import { getOrders } from '@self/lib/services/getOrders';
import { Themed, ThemedCSS } from '@self/lib/types';
import { format } from 'date-fns';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { Fragment, SVGProps, useState } from 'react';
import { Grid, Paperclip, PhoneCall, PhoneMissed, PhoneOff, Search } from 'react-feather';
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
            <ul>
              <ListRow
                css={(theme) => css`
                  > * {
                    border-right: 1px solid ${theme.colors.bgContent};

                    &:last-child {
                      border: 0;
                    }
                  }
                `}
              >
                <ListItem
                  center
                  as="label"
                  htmlFor="wut"
                  css={(theme) => css`
                    ${tw`p-6 rounded-tl rounded-bl`}

                    :hover {
                      background: ${theme.colors.bgCheckbox};
                    }
                  `}
                >
                  <Checkbox
                    id="wut"
                    animate
                    checked={active}
                    onChange={() => setActive(!active)}
                  ></Checkbox>
                </ListItem>
                <ListItem
                  col
                  center
                  css={css`
                    ${tw`p-6`}
                  `}
                >
                  <Avatar src={URL} width={50}></Avatar>
                  <div>ID 12345</div>
                </ListItem>
                <ListItem grow col>
                  <ListItem
                    css={(theme) => css`
                      border-bottom: 1px solid ${theme.colors.bgContent};
                    `}
                  >
                    <ListItem grow pad={1}>
                      <span>Ivanov Alexandr</span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Amount</Title>
                      <span>from 3 000 000</span>
                    </ListItem>
                    <ListItem col pad={1}>
                      <Title>Created</Title>
                      <span>28.03.20</span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Wants</Title>
                      <span>Sell</span>
                    </ListItem>
                    <ListItem center col pad={1}>
                      <Title>Met</Title>
                      <span>28.10.2020</span>
                    </ListItem>
                    <ListItem col pad={1}>
                      <Title>Status</Title>
                      <span>Ready</span>
                    </ListItem>
                  </ListItem>
                  <ListItem>
                    <ListItem col grow pad={1}>
                      <span>8 931 300 20 20</span>
                      <span>New York</span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Size</Title>
                      <span>
                        from 30.0m<sup>2</sup>
                      </span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Updated</Title>
                      <span>28.07.20</span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Type</Title>
                      <span>House</span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Payment</Title>
                      <span>Unknown</span>
                    </ListItem>
                    <ListItem col center pad={1}>
                      <Title>Reminders</Title>
                      <span>None</span>
                    </ListItem>
                  </ListItem>
                </ListItem>
                <ListItem
                  center
                  css={css`
                    ${tw`p-4`}
                  `}
                >
                  Salamatin Dmitriy
                </ListItem>
                <ListItem
                  center
                  css={css`
                    ${tw`p-4`}
                  `}
                >
                  <Paperclip></Paperclip>
                </ListItem>
              </ListRow>
            </ul>
          </TabPanel>

          <TabPanel value={activeTab} index={0}>
            <div
              css={
                ((theme) => css`
                  ${tw`flex rounded shadow my-4`}
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

let Title = styled.span<Themed>`
  color: ${(props) => props.theme.colors.textItemTitle};
`;

let ListRow = styled.div<Themed>`
  ${tw`flex rounded shadow-xl`}
  background: ${({ theme }) => theme.colors.bgItem};
  color: ${({ theme }) => theme.colors.textItem};
`;

let ListItem = styled.div<{ pad?: number; col?: boolean; grow?: boolean; center?: boolean }>`
  ${tw`flex`}
  ${({ col }) => col && tw`flex-col`}
  ${({ center }) => center && tw`items-center justify-center`}
  ${({ grow }) => grow && tw`flex-1`}
  padding: ${({ pad }) => pad && `${pad}rem`};

  :hover {
    /* ${tw`bg-red-300`} */
  }
`;

let ToolbarItem = styled.div<{ noPadding?: boolean }>`
  ${tw`flex`}
  ${({ noPadding }) => !noPadding && tw`px-4 space-x-2`}
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

let StackIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 24 24" width="24" strokeWidth="2" {...props}>
      <rect width="18.5" x="2.5" height="6" y="4" stroke="currentColor" fill="none"></rect>
      <rect width="18.5" x="2.5" height="6" y="15" stroke="currentColor" fill="none"></rect>
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

  &:first-child {
    ${tw`rounded-tl rounded-bl`}
  }

  &:last-child {
    ${tw`rounded-tr rounded-br`}
  }
`;

let Cell = styled.td`
  ${tw`py-4 px-4`}

  &:first-child {
    ${tw`rounded-tl rounded-bl`}
  }

  &:last-child {
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
