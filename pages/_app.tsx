import '@self/styles/normalize.css';
import { AppType } from 'next/dist/next-server/lib/utils';

let App: AppType = (props) => {
  let { Component, pageProps } = props;

  return (
    <div>
      <Component {...pageProps}></Component>
    </div>
  );
};

export default App;
