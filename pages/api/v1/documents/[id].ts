import withMiddleware from '@self/lib/middleware/withMiddleware';
import { DbApiHandler } from '@self/lib/types';

let document: DbApiHandler = async (req, res) => {
  let { id } = req.query;
  let doc = await req.db.collection('docs').findOne({ id });

  res.json({
    status: 'ok',
    data: doc,
  });
};

export default withMiddleware(document);
