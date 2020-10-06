import { css } from '@emotion/core';
import Head from 'next/head';
import tw from 'twin.macro';

let ClientsPage: React.FC<any> = () => {
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
        clients
      </div>
    </>
  );
};

export default ClientsPage;
