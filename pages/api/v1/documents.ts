import { NextApiHandler } from 'next';

let orders: NextApiHandler = (req, res) => {
  res.json({
    status: 'ok',
    data: [
      {
        id: 1,
        title: generateName(),
        content: 'Hello world!',
        author: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: generateName(),
        content: 'Hello world again!',
        author: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: generateName(),
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ipsa id alias eos? Ad laboriosam, explicabo at ea asperiores debitis omnis porro itaque eligendi sapiente, illum inventore id, minus neque?',
        author: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });
};

function generateName() {
  return (
    [
      'majestic',
      'beautiful',
      'omnipresent',
      'atrocious',
      'delicious',
      'fantastic',
      'amazing',
      'sour',
      'sweet',
      'liquid',
      'solid',
    ][~~(Math.random() * 11)] +
    ' ' +
    [
      'car',
      'spider',
      'monkey',
      'demigod',
      'penguin',
      'crab',
      'cake',
      'snake',
      'balloon',
      'man',
      'woman',
      'pedal',
      'foot',
      'bro',
    ][~~(Math.random() * 14)]
  );
}

export default orders;
