/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import CodeBlock from '@self/components/CodeBlock';
import Datetime from '@self/components/Datetime';
import ImageComponent from '@self/components/Image';
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
    <div key={post.slug}>
      <Header>
        <Title
          level={1}
          css={css`
            max-width: 44rem;
            margin: 0 auto 0.5rem;
          `}
        >
          {post.title}
        </Title>
        <Datetime date={post.createdAt}></Datetime>

        {post.pic && (
          <ImageComponent
            src={post.pic}
            css={css`
              margin-top: 2rem;
            `}
          ></ImageComponent>
        )}
      </Header>

      <Description>{post.description}</Description>

      <Markdown
        source={post.content}
        renderers={{
          heading: Heading,
          code: CodeBlock,
          image: ImageComponent,
          paragraph: Paragraph,
          text: Text,
        }}
      ></Markdown>

      <Footer>
        {post.adjacentPosts.prev && (
          <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.prev.slug}`}>
            <a className={styles.link}>◀ {post.adjacentPosts.prev.title}</a>
          </Link>
        )}
        <Next>
          {post.adjacentPosts.next && (
            <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.next.slug}`}>
              <a className={styles.link}>{post.adjacentPosts.next.title} ▶</a>
            </Link>
          )}
        </Next>
      </Footer>
    </div>
  );
};

const Heading = styled(Title)`
  max-width: 44rem;
  margin: 1.4em auto;
`;

const Header = styled.header`
  padding: 0 0.5rem;
  max-width: 44rem;
  margin: 0 auto 4rem;
`;

const Paragraph = styled.p`
  margin: 1em auto;
`;

const Description = styled.p`
  margin: 1em auto;
  max-width: 44rem;
  font-size: 1.4rem;
  color: hsl(350, 10%, 20%);
`;

const Text = styled.span`
  display: block;
  max-width: 44rem;
  margin: 0 auto;
  display: block;
`;

const Footer = styled.footer`
  display: flex;
  padding: 1.5rem 0.5rem;
`;

const Next = styled.div`
  margin-left: auto;
`;

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
