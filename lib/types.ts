import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void;

export interface MiddlewareRequest extends NextApiRequest {
  db?: Db;
}
