import { createComment } from '@self/lib/createComment';
import withDatabase from '@self/lib/middleware/withDatabase';
import { parsePhoneNumber } from '@self/lib/parsePhoneNumber';
import { DBRequestHandler, PhoneData } from '@self/lib/types';

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

  let newComment = createComment({ phoneType, content, author });
  let { value } = await req.db
    .collection<PhoneData>('phones')
    .findOneAndUpdate(
      { phoneNumber: parsedPhoneNumber.normalized },
      { $push: { comments: newComment } },
      { upsert: true, projection: { _id: 0 } },
    );

  if (value === null) {
    res.json({ status: 'ok', data: { phoneNumber, comments: [newComment] } });
  }

  res.json({ status: 'ok', data: { ...value, comments: [...value.comments, newComment] } });
};

export default withDatabase(uploadComment);
