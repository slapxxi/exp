import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

let ImageComponent: React.FunctionComponent<Props> = (props) => {
  let { src, alt, className } = props;
  let [loading, setLoading] = useState(true);
  let path = generatePath(src, 'preview');
  let finalPath = generatePath(src, 'compressed');

  useEffect(() => {
    function handler(event: any) {
      setLoading(false);
    }

    let img = new Image();
    img.src = finalPath;
    img.addEventListener('load', handler);

    return () => img.removeEventListener('load', handler);
  }, []);

  return (
    <Container className={className}>
      <Img width={1920} height={1080} src={loading ? path : finalPath} alt={alt} />
      {alt && <Description>{alt}</Description>}
    </Container>
  );
};

function generatePath(src: string, prefix: 'compressed' | 'preview'): string {
  return src.endsWith('.png')
    ? src.startsWith('/')
      ? `/${prefix}-${src.slice(1)}`
      : `/${prefix}-${src}`
    : src.startsWith('/')
    ? src
    : `/${src}`;
}

const Container = styled.span`
  display: block;
  margin: 0 auto;
`;

const Img = styled.img<any>`
  display: ${({ processing }) => (processing ? 'none' : 'block')};
  width: 100%;
  height: auto;

  &::before {
    display: block;
    content: '';
    padding-top: 54%;
  }
`;

const Description = styled.span`
  display: block;
  text-align: center;
  font-style: italic;
  color: slategrey;
  font-size: 0.84rem;
`;

export default ImageComponent;
