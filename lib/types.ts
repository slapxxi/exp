import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void;

export interface MiddlewareRequest extends NextApiRequest {
  db?: Db;
}

export type APIResponse<T = undefined> =
  | (T extends undefined ? { status: 'ok' } : { status: 'ok'; data: T })
  | { status: 'error'; message: string };

export interface Post {
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
}

export interface SerializedPost {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
}
