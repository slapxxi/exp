import { css } from '@emotion/core';
import { Avatar } from '@self/components/Avatar';
import { Toolbar } from '@self/components/Toolbar';
import { getDocuments } from '@self/lib/services/getDocuments';
import { Doc, Serialized } from '@self/lib/types';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { QueryCache, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import tw from 'twin.macro';

interface Props {
  dehydratedState: Serialized<Doc>[];
}
const URL = 'https://picsum.photos/200/200';

let DocumentsPage: React.FC<Props> = (props) => {
  let { data } = useQuery<Props['dehydratedState']>('documents', getDocuments);

  return (
    <>
      <Head>
        <title>Documents | Dashboard</title>
      </Head>

      <div
        css={css`
          ${tw`p-2`}

          @media (min-width: 768px) {
            ${tw`p-4`}
          }
        `}
      >
        <div
          css={css`
            ${tw`flex mb-2 space-x-2`}

            @media (min-width: 768px) {
              ${tw`mb-4`}
            }
          `}
        >
          <Toolbar></Toolbar>
          <Link href="/documents/new">
            <button
              css={(theme) => css`
                ${tw`px-4 rounded shadow`}
                background: ${theme.colors.bgItem};
                color: ${theme.colors.textItem};
              `}
            >
              Create
            </button>
          </Link>
        </div>
        <ul
          css={css`
            ${tw`grid`}
            gap: 0.5rem;

            @media (min-width: 768px) {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }

            @media (min-width: 1024px) {
              grid-template-columns: repeat(3, 1fr);
            }
          `}
        >
          {data.map((item, i) => (
            <li
              key={item.id}
              css={(theme) => css`
                ${tw`flex rounded p-2 shadow space-x-4`}
                min-height: 140px;
                background: ${theme.colors.bgItem};
                color: ${theme.colors.textItem};
              `}
            >
              <div
                css={css`
                  ${tw`flex flex-col justify-center space-y-2`}
                `}
              >
                <Avatar src={URL} width={64}></Avatar>
                <span
                  css={(theme) => css`
                    ${tw`self-center capitalize`}
                    color: ${theme.colors.textItemTitle};
                  `}
                >
                  {item.author}
                </span>
              </div>
              <div
                css={css`
                  ${tw`flex flex-col flex-1`}

                  > * {
                    ${tw`mb-4`}

                    &:last-child {
                      ${tw`mb-0`}
                    }
                  }
                `}
              >
                <span
                  css={(theme) => css`
                    ${tw`text-xl font-bold text-opacity-50 mb-2 capitalize`}
                    color: ${theme.colors.textItemTitle};
                  `}
                >
                  <Link href={`/documents/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                </span>
                <span>{item.content}</span>
                <div
                  css={(theme) => css`
                    ${tw`flex space-x-2 mt-auto justify-end`}
                    color: ${theme.colors.textItemTitle};
                  `}
                >
                  <span>{dayjs(item.createdAt).format('DD.MM.YY HH:mm')}</span>
                  <span>{dayjs(item.updatedAt).format('DD.MM.YY HH:mm')}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export let getServerSideProps: GetServerSideProps = async () => {
  let queryCache = new QueryCache();
  await queryCache.prefetchQuery('documents', getDocuments);
  return { props: { dehydratedState: dehydrate(queryCache) } };
};

export default DocumentsPage;
