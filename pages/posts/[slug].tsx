import { SerializedPost } from '@self/lib/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPosts } from '../api/posts';
import { getPost } from '../api/posts/[slug]';

interface Props {
  post: SerializedPost;
}

let PostPage: React.FunctionComponent<Props> = (props) => {
  let { post } = props;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
