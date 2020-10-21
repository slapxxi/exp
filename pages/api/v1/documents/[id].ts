import { NextApiHandler } from 'next';

let document: NextApiHandler = (req, res) => {
  res.json({
    status: 'ok',
    data: {
      id: 1,
      title: generateName(),
      content: 'Hello world!',
      author: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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

export default document;
