import Title from '@self/components/Title';
import { SerializedPost } from '@self/lib/types';
import styles from '@self/styles/index.module.scss';
import { format } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getPosts } from './api/posts';

interface Props {
  posts: SerializedPost[];
}

let Home: React.FunctionComponent<Props> = (props) => {
  let { posts } = props;

  return (
    <div className={styles.container}>
      <ul className={styles.postlist}>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href="/posts/[slug]" as={`/posts/${p.slug}`}>
              <a className={styles.link}>
                <Title level={1}>{p.title}</Title>
              </a>
            </Link>

            <div className={styles.date}>
              <time>{formatDate(p.createdAt)}</time>
            </div>

            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatDate(value: string): string {
  let date = new Date(value);
  return format(date, 'dd MMMM yyyy');
}

export let getStaticProps: GetStaticProps = async () => {
  let posts = await getPosts();
  posts = JSON.parse(JSON.stringify(posts));
  return { props: { posts } };
};

export default Home;
