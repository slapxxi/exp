import styled from '@emotion/styled';
import styles from '@self/styles/app.module.scss';
import '@self/styles/general.scss';
import '@self/styles/normalize.css';
import { AppType } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';

let App: AppType = (props) => {
  let { Component, pageProps } = props;

  return (
    <div>
      <Header>
        <nav>
          <ul className={styles.navlist}>
            <li>
              <Link href="/">
                <a className={styles.navlink}>Home</a>
              </Link>
            </li>
          </ul>
        </nav>
      </Header>

      <Component {...pageProps}></Component>
    </div>
  );
};

const Header = styled.header`
  padding: 0.5rem;
`;

export default App;
