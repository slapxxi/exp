import { SerializedPost } from '@self/lib/types';
import styles from '@self/styles/index.module.scss';
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
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href="/posts/[slug]" as={`/posts/${p.slug}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export let getStaticProps: GetStaticProps = async () => {
  let posts = await getPosts();
  posts = JSON.parse(JSON.stringify(posts));
  return { props: { posts } };
};

export default Home;
