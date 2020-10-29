import withMiddleware from '@self/lib/middleware/withMiddleware';
import { DbApiHandler } from '@self/lib/types';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

let orders: DbApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    let data = JSON.parse(req.body);
    let date = new Date().toISOString();
    let result = await req.db.collection('docs').insertOne({
      id: nanoid(),
      title: data.title,
      author: 'user',
      content: data.content,
      createdAt: date,
      updatedAt: dayjs(date).add(1, 'day').toISOString(),
    });
    res.json({ status: 'ok', data: result.ops[0] });
  } else {
    let docs = await req.db
      .collection('docs')
      .find({}, { projection: { _id: 0 } })
      .toArray();

    res.json({
      status: 'ok',
      data: docs,
    });
  }
};

export default withMiddleware(orders);
