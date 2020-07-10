import Pagination from '@self/components/Pagination';
import { calcPages } from '@self/lib/calcPages';
import connectDb from '@self/lib/connectDb';
import { PhoneData } from '@self/lib/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

interface Props {
  phones: PhoneData[];
  pages: number[];
  pageNumber: number;
}

let PhonesPage: React.FunctionComponent<Props> = (props) => {
  let { phones, pageNumber, pages } = props;

  return (
    <div className="container">
      <h1 className="title">Phones</h1>
      <ul className="grid grid-cols-4 my-4">
        {phones.map((p) => (
          <li key={p.phoneNumber}>
            <Link href="/phones/[pid]" as={`/phones/${p.phoneNumber}`}>
              <a className="text-blue-600 underline">{p.phoneNumber}</a>
            </Link>
          </li>
        ))}
      </ul>

      {pages.length > 1 && (
        <Pagination>
          {pages.map((p) => (
            <Pagination.Button
              key={p}
              active={p === pageNumber}
              href="/browse/[pageNumber]"
              as={`/browse/${p}`}
            >
              {p}
            </Pagination.Button>
          ))}
        </Pagination>
      )}
    </div>
  );
};

const PAGE_SIZE = 50;

export let getStaticPaths: GetStaticPaths = async () => {
  let db = await connectDb();
  let numberOfPhones = await db.collection('phones').count();
  return {
    paths: calcPages(numberOfPhones, PAGE_SIZE).map((n) => ({ params: { pageNumber: `${n}` } })),
    fallback: false,
  };
};

export let getStaticProps: GetStaticProps = async (context) => {
  let { params } = context;
  let pageNumber = parseInt(params.pageNumber as string, 10);
  let skip = pageNumber === 1 ? 0 : pageNumber * PAGE_SIZE - PAGE_SIZE;
  let db = await connectDb();
  let pages = calcPages(await db.collection('phones').count(), PAGE_SIZE);
  let result = await db
    .collection('phones')
    .aggregate([
      {
        $project: {
          _id: 0,
          phoneNumber: 1,
          numberOfComments: {
            $cond: { if: { $isArray: '$comments' }, then: { $size: '$comments' }, else: 'NA' },
          },
        },
      },
    ])
    .skip(skip)
    .limit(PAGE_SIZE)
    .toArray();
  return {
    props: { phones: result, pageNumber, pages },
    unstable_revalidate: 1,
  };
};

export default PhonesPage;
