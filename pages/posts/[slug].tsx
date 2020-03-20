import { PostWithNavigation } from '@self/lib/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { getPosts } from '../api/posts';
import { getPost } from '../api/posts/[slug]';

interface Props {
  post: PostWithNavigation;
  adjacentPosts: {
    next: string;
    prev: string;
  };
}

let PostPage: React.FunctionComponent<Props> = (props) => {
  let { post } = props;

  return (
    <div>
      <Markdown source={post.content}></Markdown>
      <footer>
        <div>
          {post.adjacentPosts.prev && (
            <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.prev.slug}`}>
              <a>Prev: {post.adjacentPosts.prev.title}</a>
            </Link>
          )}
          {post.adjacentPosts.next && (
            <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.next.slug}`}>
              <a>Next: {post.adjacentPosts.next.title}</a>
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
