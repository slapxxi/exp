import { Provider } from 'jotai';
import { AppType } from 'next/dist/next-server/lib/utils';
import '../styles/index.css';

let App: AppType = (props) => {
  let { Component, pageProps } = props;

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
