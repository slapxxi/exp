import { css } from '@emotion/core';
import { Button } from '@self/components/Button';
import { Input } from '@self/components/Input';
import { postDocument } from '@self/lib/services/postDocument';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import { queryCache, useMutation } from 'react-query';
import tw from 'twin.macro';

let NewDocumentPage: React.FC<any> = () => {
  let router = useRouter();
  let [state, send] = useReducer(newDocumentReducer, { title: '', content: '' });
  let [mutate, { status }] = useMutation(postDocument, {
    onSuccess: (data) => {
      queryCache.setQueryData(['documents', data.id], data);
      router.push(`/documents/${data.id}`);
    },
  });

  async function handleCreate() {
    if (state.title !== '' && state.content !== '' && status === 'idle') {
      mutate({ title: state.title, content: state.content });
    }
  }

  return (
    <div
      css={css`
        ${tw`p-2`}
        @media (min-width: 768px) {
          ${tw`p-4`}
        }
      `}
    >
      <h1
        css={(theme) => css`
          ${tw`text-xl`}
          color: ${theme.colors.textItem};
        `}
      >
        New Document
      </h1>
      <div
        css={css`
          ${tw`flex items-center space-x-4 mb-4`}
        `}
      >
        <label htmlFor="document-title">Title</label>
        <Input
          placeholder="Title..."
          id="document-title"
          type="text"
          value={state.title}
          onChange={(e) => send({ type: 'SET_TITLE', payload: e.target.value })}
        />
      </div>
      <div
        css={css`
          ${tw`flex items-center space-x-4 mb-4`}
        `}
      >
        <label htmlFor="document-content">Content</label>
        <textarea
          id="document-content"
          value={state.content}
          placeholder="Content..."
          css={(theme) => css`
            ${tw`rounded shadow`}
            background: ${theme.colors.bgInput};
          `}
          onChange={(e) => send({ type: 'SET_CONTENT', payload: e.target.value })}
        />
      </div>
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
};

function newDocumentReducer(state, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    default:
      return state;
  }
}

export default NewDocumentPage;
