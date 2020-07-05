import withDatabase from '@self/lib/middleware/withDatabase';
import { DBRequestHandler } from '@self/lib/types';

let uploadComment: DBRequestHandler = async (req, res) => {
  let { phoneNumber, content, author, phoneType } = JSON.parse(req.body);
  let result = await req.db
    .collection('phones')
    .updateOne(
      { phoneNumber: phoneNumber },
      { $push: { comments: { content, author, phoneType } } },
      { upsert: true },
    );
  res.json({ status: 'ok' });
};

export default withDatabase(uploadComment);
