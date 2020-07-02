import withDatabase from '@self/lib/middleware/withDatabase';
import { MiddlewareRequest } from '@self/lib/types';
import { NextApiResponse } from 'next';

async function posts(req: MiddlewareRequest, res: NextApiResponse) {
  try {
    let data = await req.db
      .collection('posts')
      .find({}, { projection: { _id: 0 } })
      .toArray();
    res.json({ status: 'ok', data });
  } catch (e) {
    res.json({ status: 'error', message: e.message });
  }
}

export default withDatabase(posts);
