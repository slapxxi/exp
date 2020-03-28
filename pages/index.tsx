/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Datetime from '@self/components/Datetime';
import Title from '@self/components/Title';
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
      <List>
        {posts.map((p) => (
          <ListItem key={p.slug}>
            <Link href="/posts/[slug]" as={`/posts/${p.slug}`}>
              <Anchor>
                <Title
                  level={1}
                  css={css`
                    font-size: 2.4rem;
                  `}
                >
                  {p.title}
                </Title>
              </Anchor>
            </Link>
            <Datetime date={p.createdAt}></Datetime>

            <p>{p.description}</p>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 960px;
`;

const ListItem = styled.li`
  margin: 2rem auto;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Anchor = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: hsl(350, 10%, 5%);

  &:hover {
    color: hsl(350, 10%, 30%);
  }
`;

export let getStaticProps: GetStaticProps = async () => {
  let posts = await getPosts();
  posts = JSON.parse(JSON.stringify(posts));
  return { props: { posts } };
};

export default Home;
