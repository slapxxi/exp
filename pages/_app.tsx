import baseStyled, { CreateStyled } from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { AppType } from 'next/dist/next-server/lib/utils';
import '../styles/index.css';

let theme = { colors: { text: 'hotpink' } } as const;

export let styled = baseStyled as CreateStyled<typeof theme>;

let App: AppType = (props) => {
  let { Component, pageProps } = props;
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
