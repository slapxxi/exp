import { NextApiHandler } from 'next';

let rest = new Array(20).fill(null).map((item, i) => ({
  id: i + 4,
  callDate: new Date(),
  phoneNumber: '89002000600',
  curator: 'Anon',
  duration: 100,
  status: 'completed',
}));

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
      ...rest,
    ],
  });
};

export default orders;
