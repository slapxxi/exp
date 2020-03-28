import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

let ImageComponent: React.FunctionComponent<Props> = (props) => {
  let { src, alt, className } = props;

  if (!src.endsWith('.png')) {
    return <Img src={generatePath(src)} alt={alt} />;
  }

  let [image, setImage] = useState('');
  let [loading, setLoading] = useState(true);
  let path = generatePath(src, 'preview');
  let finalPath = generatePath(src, 'compressed');

  useEffect(() => {
    if (src.endsWith('.svg')) {
      return;
    }

    let req = new Request(finalPath);

    caches
      .open('images')
      .then()
      .then(async (cache) => {
        let response = await cache.match(req);
        let image: string;

        if (response) {
          image = await extractImage(response);
        } else {
          let imageCache = await caches.open('images');
          await imageCache.add(req);
          let res = await imageCache.match(req);
          image = await extractImage(res);
        }

        if (image) {
          setLoading(false);
          setImage(image);
        }
      });
  }, [src]);

  return (
    <Container className={className}>
      {loading ? (
        <Img width={1920} height={1080} src={path} alt={alt} />
      ) : (
        <Img width={1920} height={1080} src={image} alt={alt} />
      )}

      {alt && <Description>{alt}</Description>}
    </Container>
  );
};

function generatePath(src: string, prefix?: 'compressed' | 'preview'): string {
  return src.endsWith('.png')
    ? src.startsWith('/')
      ? `/${prefix}-${src.slice(1)}`
      : `/${prefix}-${src}`
    : src.startsWith('/')
    ? src
    : `/${src}`;
}

async function extractImage(response: Response): Promise<string> {
  let buffer = await response.arrayBuffer();
  const prefix = 'data:image/png;base64,';
  let base64Image = arrayBufferToBase64(buffer);
  return `${prefix}${base64Image}`;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  let bytes: number[] = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b: number) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
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
