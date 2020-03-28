import styled from '@emotion/styled';

interface Props {
  level: number;
  className?: string;
}

let Title: React.FunctionComponent<Props> = (props) => {
  let { level, children, className } = props;
  let elem = `h${level}`;

  return (
    // @ts-ignore
    <Container as={elem} className={className} level={level}>
      {children}
    </Container>
  );
};

const Container = styled.h1<{ level: number }>`
  font-family: Poppins, sans-serif;
  font-size: ${({ level }) => (level === 1 ? 3 : 4.5 / level)}rem;
  margin: 0 auto;
`;

export default Title;
