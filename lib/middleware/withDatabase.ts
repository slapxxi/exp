import { MiddlewareRequest, RequestHandler } from '@self/lib/types';
import { MongoClient } from 'mongodb';
import { NextApiResponse } from 'next';

const DB_NAME = 'experimental';

let client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

function withDatabase(handler: RequestHandler) {
  return (req: MiddlewareRequest, res: NextApiResponse) => {
    if (!client.isConnected()) {
      return client.connect().then(() => {
        req.db = client.db(DB_NAME);
        return handler(req, res);
      });
    }

    req.db = client.db(DB_NAME);

    return handler(req, res);
  };
}

export default withDatabase;
