import { css } from '@emotion/core';
import { getDocument } from '@self/lib/services/getDocument';
import { Doc, Serialized } from '@self/lib/types';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';

interface Props {
  initialData: Serialized<Doc>;
}

let DocumentsPage: React.FC<Props> = (props) => {
  let { initialData } = props;
  let { data } = useQuery<Props['initialData']>(
    ['documents', initialData.id],
    () => getDocument(initialData.id),
    {
      initialData,
    },
  );

  return (
    <div
      css={css`
        ${tw`flex flex-col p-4`}
      `}
    >
      <div
        css={css`
          ${tw`text-2xl text-white font-bold`}
        `}
      >
        {data.title}
      </div>
      <div>{data.author}</div>
    </div>
  );
};

export let getServerSideProps: GetServerSideProps = async (context) => {
  let data = await getDocument(context.params.id as string);
  return { props: { initialData: data } };
};

export default DocumentsPage;
