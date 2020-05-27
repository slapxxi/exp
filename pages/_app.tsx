import styled from '@emotion/styled';
import styles from '@self/styles/app.module.scss';
import '@self/styles/normalize.css';
import { AppType } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import { RecoilRoot } from 'recoil';

let App: AppType = (props) => {
  let { Component, pageProps } = props;

  return (
    <div>
      <Header>
        <nav>
          <List>
            <ListItem>
              <Link href="/" as="/">
                <a className={styles.navlink}>Home</a>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/login" as="/login">
                <a className={styles.navlink}>Login</a>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Header>

      <RecoilRoot>
        <Component {...pageProps}></Component>
      </RecoilRoot>
    </div>
  );
};

const Header = styled.header`
  padding: 0;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 5px;
`;

const ListItem = styled.li`
  margin: 5px;
`;

export default App;
