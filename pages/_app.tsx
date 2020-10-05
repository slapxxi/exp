import { defaultTheme } from '@self/lib/styles/theme';
import { ThemeProvider } from 'emotion-theming';
import { AppType } from 'next/dist/next-server/lib/utils';
import '../styles/index.css';

let App: AppType = (props) => {
  let { Component, pageProps } = props;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
