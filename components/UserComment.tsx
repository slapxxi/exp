import type { UserComment as IUserComment } from '@self/lib/types';
import Link from 'next/link';
import React from 'react';
import LoadingBg from './LoadingBg';
import PhoneNumber from './PhoneNumber';

interface Props {
  comment: IUserComment;
  phoneNumber?: string;
  loading?: boolean;
}

let UserComment = React.forwardRef<any, Props>((props, ref) => {
  let { comment, phoneNumber, loading = false } = props;

  return (
    <li ref={ref} className="flex flex-col shadow rounded p-4 space-y-4 mb-4 overflow-hidden">
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
