import { css } from '@emotion/core';
import { Avatar } from '@self/components/Avatar';
import { getDocuments } from '@self/lib/services/getDocuments';
import { Doc, Serialized } from '@self/lib/types';
import format from 'date-fns/format';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';

interface Props {
  initialData: Serialized<Doc>[];
}

const URL = 'https://picsum.photos/200/200';

let DocumentsPage: React.FC<Props> = (props) => {
  let { initialData } = props;
  let { data } = useQuery<Props['initialData']>('documents', () => getDocuments(), {
    initialData,
  });

  return (
    <>
      <Head>
        <title>Documents | Dashboard</title>
      </Head>

      <div
        css={css`
          ${tw`p-2`}
        `}
      >
        <ul
          css={css`
            ${tw`grid`}
          `}
        >
          {data.map((item, i) => (
            <li
              key={item.id}
              css={(theme) => css`
                ${tw`flex rounded p-2 mb-2 shadow space-x-4`}
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
                  <Link href="/documents/[id]" as={`/documents/${item.id}`}>
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
                  <span>{format(new Date(item.createdAt), 'HH:mm d.MM.yy')}</span>
                  <span>{format(new Date(item.updatedAt), 'HH:mm d.MM.yy')}</span>
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
  let data = await getDocuments();
  return { props: { initialData: data } };
};

export default DocumentsPage;
