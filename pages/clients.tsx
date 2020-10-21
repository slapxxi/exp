import { css } from '@emotion/core';
import { Dropdown } from '@self/components/Dropdown';
import { PropertyInfo } from '@self/components/PropertyInfo';
import { Tab, TabPanel, Tabs } from '@self/components/Tabs';
import { Toolbar } from '@self/components/Toolbar';
import { useClientsPageStore } from '@self/lib/hooks/useClientsTabStore';
import { useSettingsStore } from '@self/lib/hooks/useSettingsStore';
import { getOrders } from '@self/lib/services/getOrders';
import { getProperty } from '@self/lib/services/getProperty';
import { PropertyItem, Serialized } from '@self/lib/types';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';
import shallow from 'zustand/shallow';

interface Props {
  initialData: any;
}

let ClientsPage: NextPage<Props> = (props) => {
  let { initialData } = props;
  let reduceMotion = useSettingsStore((s) => s.reduceMotion);
  let [activeTab, setActiveTab] = useClientsPageStore(
    ({ activeTab, setActiveTab }) => [activeTab, setActiveTab],
    shallow,
  );
  let { data: propertyData } = useQuery<Serialized<PropertyItem>[]>('propertyData', getProperty, {
    initialData: initialData.property,
  });
  let [buttonElem, setButtonElem] = useState();
  let [active, setActive] = useState(false);
  let buttonRef = useCallback((elem) => {
    setButtonElem(elem);
  }, []);

  return (
    <>
      <Head>
        <title>Clients | Dashboard</title>
      </Head>

      <div>
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} animate={!reduceMotion}>
          <Tab label="Requests"></Tab>
          <Tab label="Property"></Tab>
          <Tab label="Clients"></Tab>
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

            <h1>Requests</h1>
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
              animate={!reduceMotion}
              anchorElement={buttonElem}
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
                <p
                  css={css`
                    ${tw`my-4`}
                  `}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et maiores earum
                  voluptatum ab tenetur asperiores voluptate possimus nulla, rem illum. Ab natus
                  saepe eius ullam, dignissimos accusantium iste cumque expedita.
                </p>
                <button>Next</button>
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
