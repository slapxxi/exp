import { css } from '@emotion/core';
import Head from 'next/head';
import { useState } from 'react';
import { useSpring } from 'react-spring';
import tw from 'twin.macro';

const URL = 'https://picsum.photos/500/500';

let IndexPage: React.FC = () => {
  let [active, setActive] = useState(false);
  let [checked, setChecked] = useState(false);
  let ap = useSpring({
    offset: active ? 50 : 0,
    radius: active ? 4 : 0,
    height: active ? 100 : 25,
    scale: active ? 1 : 0.1,
  });

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
            width: 500px;
            height: 500px;
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
