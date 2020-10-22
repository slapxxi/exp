import { NextApiHandler } from 'next';

let rest = new Array(10).fill(null).map((item, i) => ({
  userId: 2 + i,
  name: 'Ivan Ivanov',
  phoneNumber: '89284564334',
  location: 'Los Angeles',
  curator: 'Salamatin Andrey',
  status: 'not-ready',
  attachments: null,
  reminders: null,
  payment: null,
  wants: 'sell',
  type: 'house',
  createdAt: new Date(1000),
  updatedAt: new Date(),
  met: new Date(),
  amount: ~~(Math.random() * 3_000_000),
  size: ~~(Math.random() * 30),
}));

let orders: NextApiHandler = (req, res) => {
  res.json({
    status: 'ok',
    data: [
      {
        userId: 1,
        name: 'Slava Pavlutin',
        phoneNumber: '89284564334',
        location: 'New York',
        curator: 'Salamatin Andrey',
        attachments: null,
        status: 'ready',
        reminders: null,
        payment: null,
        wants: 'sell',
        type: 'house',
        createdAt: new Date(1000),
        updatedAt: new Date(),
        met: new Date(),
        amount: 3_000_000,
        size: ~~(Math.random() * 30),
      },
      ...rest,
    ],
  });
};

export default orders;
