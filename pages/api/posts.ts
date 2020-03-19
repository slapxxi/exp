import connectDB from '@self/lib/connectDB';
import { MiddlewareRequest } from '@self/lib/types';
import { NextApiResponse } from 'next';

async function posts(req: MiddlewareRequest, res: NextApiResponse) {
  let data = await getPosts();
  res.json({ status: 'ok', data });
}

export async function getPosts() {
  let db = await connectDB();
  let cursor = db.collection('posts').find({}, { projection: { _id: 0 } });
  let data = await cursor.sort({ createdAt: 1, title: 1 }).toArray();
  return data;
}

export default posts;
