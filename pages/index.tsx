import Link from 'next/link';
import { Eye, MessageCircle } from 'react-feather';

interface Props {
  tasks: any[];
}

let exampleComment = {
  author: 'Maria',
  content: 'Very bad people',
  phone: '4993009765',
  createdAt: new Date(),
};

let IndexPage: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="p-4">
      <h1 className="my-4 text-xl">Recent Comments</h1>

      <div className="my-4">
        <div className="rounded border border-gray-400 overflow-hidden">
          <header className="flex space-x-4 p-2 bg-gray-200">
            <span className="mr-auto">{exampleComment.author}</span>
            <span className="flex items-center space-x-1 text-gray-600">
              <Eye size={18} className="inline text-gray-500"></Eye>
              <span>100</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-600">
              <MessageCircle size={18} className="inline text-gray-500"></MessageCircle>
              <span>
                <Link href="/phones/[pid]" as={`/phones/${exampleComment.phone}`}>
                  <a className="hover:text-gray-800">32</a>
                </Link>
              </span>
            </span>
          </header>
          <div className="p-2">
            <p>{exampleComment.content}</p>
          </div>
          <footer className="flex flex-wrap p-2 text-gray-600 justify-end space-x-2">
            <small>{exampleComment.createdAt.toUTCString()}</small>
            <small>
              Marked as <strong>Scam</strong>
            </small>
          </footer>
        </div>
      </div>

      <ul className="flex">
        <li className="pagination-btn rounded-tl rounded-bl">«</li>
        <li className="pagination-btn">‹</li>
        <li className="pagination-btn">…</li>
        <li className="pagination-btn">›</li>
        <li className="pagination-btn border-r rounded-tr rounded-br">»</li>
      </ul>
    </div>
  );
};

export default IndexPage;
