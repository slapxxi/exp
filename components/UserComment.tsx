/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import type { UserComment as IUserComment } from '@self/lib/types';
import Link from 'next/link';
import React from 'react';
import LoadingBg from './LoadingBg';
import PhoneNumber from './PhoneNumber';

interface Props {
  comment: IUserComment;
  phoneNumber?: string;
  loading?: boolean;
  fresh?: boolean;
}

let pulseAnimation = keyframes`
0% {
		box-shadow: 0 0 0 0 hsla(200, 50%, 60%, 0.7);
	}
	
70% {
  box-shadow: 0 0 10px 10px hsla(200, 50%, 60%, 0);
}
	
100% {
  box-shadow: 0 0 0 0 hsla(200, 50%, 60%, 0);
}
`;

let UserComment = React.forwardRef<any, Props>((props, ref) => {
  let { comment, phoneNumber, loading = false, fresh = false } = props;

  return (
    <li
      ref={ref}
      className="flex flex-col shadow rounded p-4 space-y-4 mb-4 overflow-hidden"
      css={
        fresh &&
        css`
          border: 1px solid hsl(200, 10%, 60%, 0.3);
          animation: 2.8s ${pulseAnimation} infinite cubic-bezier(0.075, 0.82, 0.165, 1);
        `
      }
    >
      <header className="flex text-gray-600">
        <LoadingBg loading={loading} className="text-sm">
          <small className="mr-4">{comment.author ? comment.author : 'Anonymous'}</small>
        </LoadingBg>
        {PhoneNumber && (
          <LoadingBg loading={loading} className="ml-auto text-sm">
            <Link href="/phones/[pid]" as={`/phones/${phoneNumber}`}>
              <a className="link ml-auto text-sm">{phoneNumber}</a>
            </Link>
          </LoadingBg>
        )}
      </header>

      {comment.content && (
        <LoadingBg loading={loading}>
          <div className="flex items-center space-x-4">
            <div>
              <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
            </div>
            <span>{comment.content}</span>
          </div>
        </LoadingBg>
      )}

      <footer className="flex text-gray-600">
        {comment.createdAt && (
          <LoadingBg loading={loading} className="text-sm">
            <small className="mr-4">{new Date(comment.createdAt).toDateString()}</small>
          </LoadingBg>
        )}
        <LoadingBg loading={loading} className="ml-auto text-sm">
          <small className="ml-auto">
            Marked as <strong>{comment.phoneType}</strong>
          </small>
        </LoadingBg>
      </footer>
    </li>
  );
});

export default UserComment;
