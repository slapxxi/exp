import styles from '@self/styles/app.module.scss';
import '@self/styles/general.scss';
import '@self/styles/normalize.css';
import { AppType } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';

let App: AppType = (props) => {
  let { Component, pageProps } = props;

  return (
    <div className={styles.container}>
      <header>
        <nav>
          <ul className={styles.navlist}>
            <li>
              <Link href="/">
                <a className={styles.navlink}>Home</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps}></Component>
    </div>
  );
};

export default App;
