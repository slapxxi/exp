/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import CodeBlock from '@self/components/CodeBlock';
import Datetime from '@self/components/Datetime';
import ImageComponent from '@self/components/Image';
import Title from '@self/components/Title';
import { PostWithNavigation } from '@self/lib/types';
import styles from '@self/styles/slug.module.scss';
import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import Markdown from 'react-markdown';
import { getPosts } from '../api/posts';
import { getPost } from '../api/posts/[slug]';

interface Props {
  post: PostWithNavigation;
}

let PostPage: React.FunctionComponent<Props> = (props) => {
  let { post } = props;

  return (
    <Container key={post.slug}>
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
          <Img
            src={post.pic}
            css={css`
              margin-top: 2rem;
            `}
          ></Img>
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
        <Prev>
          {post.adjacentPosts.prev && (
            <>
              <span>◀</span>
              <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.prev.slug}`}>
                <a className={styles.link}> {post.adjacentPosts.prev.title}</a>
              </Link>
            </>
          )}
        </Prev>
        <Next>
          {post.adjacentPosts.next && (
            <>
              <Link href="/posts/[slug]" as={`/posts/${post.adjacentPosts.next.slug}`}>
                <a className={styles.link}>{post.adjacentPosts.next.title} </a>
              </Link>
              <span>▶</span>
            </>
          )}
        </Next>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 0;
`;

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

const Img = styled.img`
  width: 100%;
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

const sharedStyles = css`
  position: fixed;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  top: 50px;
  width: 200px;
  height: calc(100vh - 50px);
  padding: 1rem;
  opacity: 0.3;
  transition: opacity 0.3s;

  :hover {
    opacity: 1;
  }

  a:link,
  a:hover,
  a:visited {
    color: hotpink;
  }

  > span {
    color: hotpink;
  }
`;

const Prev = styled.div`
  ${sharedStyles}
  left: 0;
  justify-content: flex-start;

  > span {
    margin-right: 1rem;
  }
`;

const Next = styled.div`
  ${sharedStyles}
  right: 0;
  justify-content: flex-end;

  > span {
    margin-left: 1rem;
  }
`;

async function extractImage(p: string): Promise<string> {
  let buffer = fs.readFileSync(path.join('public', `compressed-${p}`));
  const prefix = 'data:image/png;base64,';
  let base64Image = base64ArrayBuffer(buffer);
  return `${prefix}${base64Image}`;
}

function base64ArrayBuffer(arrayBuffer: ArrayBuffer) {
  var base64 = '';
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var bytes = new Uint8Array(arrayBuffer);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;

  var a, b, c, d;
  var chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '==';
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }

  return base64;
}

export let getStaticPaths: GetStaticPaths = async () => {
  let paths = (await getPosts()).map((p) => `/posts/${p.slug}`);
  return { paths, fallback: false };
};

export let getStaticProps: GetStaticProps = async (context) => {
  let { slug } = context.params;
  let post = await getPost(slug as string);

  if (post.pic) {
    let image = await extractImage(post.pic);
    post.pic = image;
  }

  post = JSON.parse(JSON.stringify(post));
  return { props: { post } };
};

export default PostPage;
