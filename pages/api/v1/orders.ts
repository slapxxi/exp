import { NextApiHandler } from 'next';

let orders: NextApiHandler = (req, res) => {
  res.json({
    status: 'ok',
    data: [
      {
        id: 1,
        callDate: new Date(),
        phoneNumber: '89284564334',
        curator: 'Salamatov',
        status: 'completed',
        duration: 392,
        recording: null,
      },
      {
        id: 2,
        callDate: new Date(),
        phoneNumber: '89284564300',
        curator: 'Salamatov',
        status: 'no-response',
        duration: null,
        recording: null,
      },
      {
        id: 3,
        callDate: new Date(),
        phoneNumber: '89284564200',
        curator: 'Salamatov',
        status: 'busy',
        duration: null,
        recording: null,
      },
    ],
  });
};

export default orders;
