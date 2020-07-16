import withDatabase from '@self/lib/middleware/withDatabase';
import { NextApiHandler } from 'next';

function withMiddleware(handler: NextApiHandler) {
  return withDatabase(handler);
}

export default withMiddleware;
