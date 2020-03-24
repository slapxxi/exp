import Datetime from '@self/components/Datetime';
import Title from '@self/components/Title';
import { PostWithNavigation } from '@self/lib/types';
import styles from '@self/styles/slug.module.scss';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { getPosts } from '../api/posts';
import { getPost } from '../api/posts/[slug]';

interface Props {
  post: PostWithNavigation;
}

let PostPage: React.FunctionComponent<Props> = (props) => {
  let { post } = props;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title level={1} className={styles.title}>
          {post.title}
        </Title>
        <Datetime date={post.createdAt}></Datetime>
      </header>

      <Markdown source={post.content} renderers={{ heading: Title }}></Markdown>

      <footer className={styles.footer}>
        {post.adjacentPosts.prev && (
          <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.prev.slug}`}>
            <a className={styles.link}>◀ {post.adjacentPosts.prev.title}</a>
          </Link>
        )}
        <div className={styles.next}>
          {post.adjacentPosts.next && (
            <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.next.slug}`}>
              <a className={styles.link}>{post.adjacentPosts.next.title} ▶</a>
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export let getStaticPaths: GetStaticPaths = async () => {
  let paths = (await getPosts()).map((p) => `/posts/${p.slug}`);
  return { paths, fallback: false };
};

export let getStaticProps: GetStaticProps = async (context) => {
  let { slug } = context.params;
  let post = await getPost(slug as string);
  post = JSON.parse(JSON.stringify(post));
  return { props: { post } };
};

export default PostPage;
