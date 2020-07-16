import Pagination from '@self/components/Pagination';
import UserComment from '@self/components/UserComment';
import { PhoneType } from '@self/lib/types';

interface Props {
  tasks: any[];
}

let exampleComment = {
  id: 'unique',
  author: 'Maria',
  content: 'Very bad people',
  phone: '4993009765',
  createdAt: new Date(),
  phoneType: 'scam' as PhoneType,
  likes: 0,
  dislikes: 0,
};

let IndexPage: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="p-4">
      <h1 className="my-4 text-xl">Recent Comments</h1>

      <UserComment comment={exampleComment} phoneNumber={'89000000000'} loading></UserComment>

      <Pagination>
        <Pagination.First href="/" as="/">
          «
        </Pagination.First>
        <Pagination.Button href="/" as="/">
          ‹
        </Pagination.Button>
        <Pagination.Button href="/" as="/">
          1
        </Pagination.Button>
        <Pagination.Button href="/" as="/">
          ›
        </Pagination.Button>
        <Pagination.Last href="/" as="/">
          »
        </Pagination.Last>
      </Pagination>
    </div>
  );
};

export default IndexPage;
