import withDatabase from '@self/lib/middleware/withDatabase';
import { DBRequestHandler } from '@self/lib/types';

let uploadComment: DBRequestHandler = async (req, res) => {
  let params = JSON.parse(req.body);
  let result = await req.db.collection('phones').updateOne(
    { phoneNumber: params.phoneNumber },
    {
      $push: {
        comments: { content: params.content, author: params.author, phoneType: params.phoneType },
      },
    },
    { upsert: true },
  );
  res.json({ status: 'ok' });
};

export default withDatabase(uploadComment);
