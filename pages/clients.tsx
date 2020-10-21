import { css } from '@emotion/core';
import { Dropdown } from '@self/components/Dropdown';
import { OrderRow } from '@self/components/OrderRow';
import { PropertyInfo } from '@self/components/PropertyInfo';
import { Tab, TabPanel, Tabs } from '@self/components/Tabs';
import { Toolbar } from '@self/components/Toolbar';
import { useClientsPageStore } from '@self/lib/hooks/useClientsTabStore';
import { getOrders } from '@self/lib/services/getOrders';
import { getProperty } from '@self/lib/services/getProperty';
import { OrderItem, PropertyItem, Serialized } from '@self/lib/types';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';
import shallow from 'zustand/shallow';

interface Props {
  initialData: any;
}

let ClientsPage: NextPage<Props> = (props) => {
  let { initialData } = props;
  let [activeTab, setActiveTab] = useClientsPageStore(
    ({ activeTab, setActiveTab }) => [activeTab, setActiveTab],
    shallow,
  );
  let [active, setActive] = useState(false);
  let { status, data } = useQuery<Serialized<OrderItem>[]>('ordersData', getOrders, {
    initialData: initialData.orders,
  });
  let { status: propertyStatus, data: propertyData } = useQuery<Serialized<PropertyItem>[]>(
    'propertyData',
    getProperty,
    {
      initialData: initialData.property,
    },
  );
  let buttonRef = useRef();

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
                <PropertyInfo
                  key={item.userId}
                  item={item}
                  selected={active}
                  onSelect={() => setActive(!active)}
                ></PropertyInfo>
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
                <OrderRow key={item.id} item={item}></OrderRow>
              ))}
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <button
              ref={buttonRef}
              onClick={() => setActive(!active)}
              css={(theme) => css`
                ${tw`absolute right-0 p-4 rounded mr-2`}
                background: ${theme.colors.bgItem};
                color: ${theme.colors.textItem};
              `}
            >
              Choose
            </button>
            <Dropdown
              animate
              anchorElement={buttonRef.current}
              open={active}
              onClose={() => setActive(!active)}
            >
              <div
                css={(theme) => css`
                  ${tw`p-4`}
                  max-width: 350px;
                  color: ${theme.colors.textItem};
                `}
              >
                <h1
                  css={css`
                    ${tw`text-2xl mb-4`}
                  `}
                >
                  Greetings
                </h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et maiores earum
                  voluptatum ab tenetur asperiores voluptate possimus nulla, rem illum. Ab natus
                  saepe eius ullam, dignissimos accusantium iste cumque expedita.
                </p>
                <button
                  css={css`
                    ${tw`py-2`}
                  `}
                >
                  Next
                </button>
              </div>
            </Dropdown>
          </TabPanel>
        </div>
      </div>
    </>
  );
};

export let getServerSideProps: GetServerSideProps<Props> = async () => {
  let data = await getOrders();
  let propertyData = await getProperty();

  return { props: { initialData: { orders: data, property: propertyData } } };
};

export default ClientsPage;
