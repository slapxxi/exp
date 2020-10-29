import { css } from '@emotion/core';
import { Spinner } from '@self/components/Spinner';
import { getDocument } from '@self/lib/services/getDocument';
import { Doc, Serialized } from '@self/lib/types';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { AlertTriangle } from 'react-feather';
import { QueryCache, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import tw from 'twin.macro';

interface Props {
  dehydratedState: Serialized<Doc>;
}

let DocumentPage: React.FC<Props> = (props) => {
  let { query } = useRouter();
  let { data, isLoading, isError, error } = useQuery<Props['dehydratedState']>(
    ['documents', query.id],
    (key, id) => getDocument(id),
  );

  return (
    <div
      css={css`
        ${tw`flex flex-col p-4`}
      `}
    >
      {isLoading && <Spinner></Spinner>}
      {isError && (
        <div
          css={css`
            ${tw`flex bg-red-600 rounded p-2 text-white mb-4 shadow space-x-2`}
            border: 1px solid transparent;
          `}
        >
          <AlertTriangle
            size={18}
            css={css`
              ${tw`self-center`}
            `}
          ></AlertTriangle>
          <span>{error.message}</span>
        </div>
      )}
      <div
        css={(theme) => css`
          ${tw`flex text-2xl font-bold`}
          color: ${theme.colors.textTitle};
        `}
      >
        {data.title}
      </div>
      <div
        css={(theme) => css`
          ${tw`flex space-x-2`}
          color: ${theme.colors.textItemTitle};
        `}
      >
        <span>{dayjs(data.createdAt).format('MMMM DD')}</span>
        <span>
          by{' '}
          <span
            css={css`
              ${tw`capitalize`}
            `}
          >
            {data.author}
          </span>
        </span>
      </div>
      <p
        css={(theme) => css`
          ${tw`my-4 text-lg`}
          color: ${theme.colors.textItem};
        `}
      >
        {data.content}
      </p>
    </div>
  );
};

export let getServerSideProps: GetServerSideProps = async (context) => {
  let queryCache = new QueryCache();
  await queryCache.prefetchQuery(['documents', context.params.id], (key, id) =>
    getDocument(id as string),
  );
  return { props: { dehydratedState: dehydrate(queryCache) } };
};

export default DocumentPage;
