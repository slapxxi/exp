import Pager from '@self/components/Pager';
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
      <h1 className="title my-4">Phones</h1>

      {phones.length === 0 && <p className="text-center">There are no phones yet.</p>}

      <ul className="grid grid-cols-3 gap-2 md:gap-4 md:grid-cols-5 my-4">
        {phones.map((p) => (
          <li key={p.phoneNumber}>
            <Link href="/phones/[pid]" as={`/phones/${p.phoneNumber}`}>
              <a className="text-blue-600 underline">{p.phoneNumber}</a>
            </Link>
          </li>
        ))}
      </ul>

      <Pager pages={pages} currentPage={pageNumber}></Pager>
    </div>
  );
};

const PAGE_SIZE = 50;

export let getStaticPaths: GetStaticPaths = async () => {
  let db = await connectDb();
  let numberOfPhones = await db.collection('phones').countDocuments();
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
  let pages = calcPages(await db.collection('phones').countDocuments(), PAGE_SIZE);
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
    revalidate: 1,
  };
};

export default PhonesPage;
