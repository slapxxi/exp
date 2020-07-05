import withDatabase from '@self/lib/middleware/withDatabase';
import { parsePhoneNumber } from '@self/lib/parsePhoneNumber';
import { DBRequestHandler } from '@self/lib/types';

let uploadComment: DBRequestHandler = async (req, res) => {
  let { phoneNumber, content, author, phoneType } = JSON.parse(req.body);
  let parsedPhoneNumber: ReturnType<typeof parsePhoneNumber>;

  if (phoneType === '') {
    return res.json({ status: 'error', message: 'Phone type is not specified' });
  }

  try {
    parsedPhoneNumber = parsePhoneNumber(phoneNumber);
  } catch {
    return res.json({ status: 'error', message: 'Incorrect phone number format' });
  }

  await req.db
    .collection('phones')
    .updateOne(
      { phoneNumber: parsedPhoneNumber.normalized },
      { $push: { comments: { content, author, phoneType } } },
      { upsert: true },
    );

  res.json({ status: 'ok' });
};

export default withDatabase(uploadComment);
