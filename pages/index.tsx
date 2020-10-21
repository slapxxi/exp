import { css } from '@emotion/core';
import { Dropdown } from '@self/components/Dropdown';
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';

let IndexPage: React.FC = () => {
  let [active, setActive] = useState(false);
  let [rootEl, setRootEl] = useState();

  let handleRef = useCallback((elem) => {
    if (elem) {
      setRootEl(elem);
    }
  }, []);

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
        <Dropdown open anchorElement={rootEl}>
          <div
            css={css`
              ${tw`text-gray-300 p-4`}
            `}
          >
            Hello
          </div>
        </Dropdown>
        <svg
          ref={handleRef}
          viewBox="0 0 100 100"
          onClick={() => setActive(!active)}
          css={css`
            ${tw`select-none`}
            width: 100%;
            max-width: 500px;
          `}
        >
          <defs>
            <linearGradient id="grad">
              <stop stopColor="tomato" offset="0"></stop>
              <stop stopColor="purple" offset="100%"></stop>
            </linearGradient>
          </defs>
          <circle cx={50} cy={50} r={40} fill="url(#grad)"></circle>
        </svg>
      </div>
    </>
  );
};

export default IndexPage;
