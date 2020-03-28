import styled from '@emotion/styled';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
  language: string;
  value: string;
}

let CodeBlock: React.FunctionComponent<Props> = (props) => {
  let { language, value } = props;

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
  }

  return (
    <Container>
      <Navigation>
        <button onClick={handleCopy}>Copy</button>
      </Navigation>
      <SyntaxHighlighter language={language} style={xonokai}>
        {value}
      </SyntaxHighlighter>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
`;

const Navigation = styled.div`
  position: absolute;
  z-index: 1;
  right: 0;
  border-radius: 0 0 0 5px;
  overflow: hidden;
  background: #fff;
  font-size: 12px;
`;

export default CodeBlock;
