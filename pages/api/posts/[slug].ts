import connectDB from '@self/lib/connectDB';
import { MiddlewareRequest } from '@self/lib/types';
import { NextApiResponse } from 'next';

async function post(req: MiddlewareRequest, res: NextApiResponse) {
  let { slug } = req.query;
  let data = await getPost(slug as string);
  res.json({ status: 'ok', data });
}

export async function getPost(slug: string) {
  let db = await connectDB();
  let data = await db.collection('posts').findOne({ slug }, { projection: { _id: 0 } });
  return data;
}

export default post;
