import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { getOrders } from '@self/lib/services/getOrders';
import { Themed } from '@self/lib/types';
import { format } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Check, X } from 'react-feather';
import { useQuery } from 'react-query';
import tw from 'twin.macro';

interface Props {
  initialData: any;
}

let ClientsPage: NextPage<Props> = (props) => {
  let { initialData } = props;
  let { status, data } = useQuery('ordersData', getOrders, { initialData: initialData });
  console.log(status, data);

  return (
    <>
      <Head>
        <title>Clients | Dashboard</title>
      </Head>

      <div
        css={css`
          ${tw`p-4`}
        `}
      >
        <table
          css={(theme) =>
            css`
              ${tw`w-full`}
              color: ${theme.colors.textTableHeader};
            `
          }
        >
          <thead
            css={css`
              ${tw`text-left`}
            `}
          >
            <tr css={css``}>
              <th>Status</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Curator</th>
              <th>Duration</th>
              <th colSpan={2}>Recording</th>
            </tr>
          </thead>
          <tbody>
            {status === 'success' &&
              data.map((item, i) => (
                <>
                  <Row key={item.id}>
                    <Cell
                      title={item.status}
                      css={css`
                        text-align: center;
                        vertical-align: middle;
                      `}
                    >
                      {item.status === 'completed' && <Icon as={Check} success></Icon>}
                      {item.status === 'no-response' && <Icon as={X}></Icon>}
                    </Cell>
                    <Cell>{item.phoneNumber}</Cell>
                    <Cell>{format(new Date(item.callDate), 'dd.MM.yyyy hh:mm:ss')}</Cell>
                    <Cell>{item.curator}</Cell>
                    <Cell>{item.duration ? ~~(item.duration / 60) : 'N/A'}</Cell>
                    <Cell>
                      <Play></Play>
                    </Cell>
                    <Cell>
                      {item.status === 'completed' && <Button>Add</Button>}
                      {item.status === 'no-response' && <Button>Call Back</Button>}
                    </Cell>
                  </Row>
                  <Spacer key={i}></Spacer>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

let Play: React.FC = () => {
  return (
    <svg viewBox="0 0 10 10" width="30">
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

let Icon = styled.div<Themed<{ success?: boolean }>>`
  ${tw`inline-block`}
  color: ${({ success, theme }) => (success ? theme.colors.success : theme.colors.error)};
`;

let Row = styled.tr<Themed>`
  ${tw`rounded shadow`}
  background: ${({ theme }) => theme.colors.bgItem};
  color: ${({ theme }) => theme.colors.textItem};
`;

let Cell = styled.td`
  ${tw`py-4 px-0`}
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
