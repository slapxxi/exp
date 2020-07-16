import type { UserComment as IUserComment } from '@self/lib/types';
import Link from 'next/link';
import PhoneNumber from './PhoneNumber';

interface Props {
  comment: IUserComment;
  phoneNumber?: string;
}

let UserComment: React.FunctionComponent<Props> = (props) => {
  let { comment, phoneNumber } = props;

  return (
    <li key={comment.id} className="flex flex-col shadow rounded p-4 space-y-4 mb-4">
      <header className="flex text-gray-600">
        <small className="mr-4">{comment.author ? comment.author : 'Anonymous'}</small>
        {PhoneNumber && (
          <Link href="/phones/[pid]" as={`/phones/${phoneNumber}`}>
            <a className="link ml-auto text-sm">{phoneNumber}</a>
          </Link>
        )}
      </header>
      {comment.content && (
        <div className="flex items-center space-x-4">
          <div>
            <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
          </div>
          <span>{comment.content}</span>
        </div>
      )}
      <footer className="flex text-gray-600">
        {comment.createdAt && (
          <small className="mr-4">{new Date(comment.createdAt).toDateString()}</small>
        )}
        <small className="ml-auto">
          Marked as <strong>{comment.phoneType}</strong>
        </small>
      </footer>
    </li>
  );
};

export default UserComment;
