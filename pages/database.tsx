import { css } from '@emotion/core';
import Head from 'next/head';
import React, { useState } from 'react';
import tw from 'twin.macro';

let DatabasePage: React.FC = () => {
  let [active, setActive] = useState(false);

  return (
    <>
      <Head>
        <title>Profile | Dashboard</title>
      </Head>
      <div
        css={css`
          ${tw`flex flex-col items-center justify-center h-full`}
        `}
      >
        <svg
          viewBox="0 0 100 100"
          onClick={() => setActive(!active)}
          css={css`
            ${tw`select-none`}
            width: 100%;
            max-width: 500px;
          `}
        >
          <defs>
            <linearGradient id="database-grad">
              <stop stopColor="tomato" offset="0"></stop>
              <stop stopColor="orange" offset="100%"></stop>
            </linearGradient>
          </defs>
          <rect width={50} height={50} x="25" y="25" rx="4" fill="url(#database-grad)"></rect>
        </svg>
      </div>
    </>
  );
};

export default DatabasePage;
