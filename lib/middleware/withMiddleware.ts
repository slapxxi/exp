import withDatabase from '@self/lib/middleware/withDatabase';
import { RequestHandler } from '@self/lib/types';

function withMiddleware(handler: RequestHandler) {
  return withDatabase(handler);
}

export default withMiddleware;
