import { DbApiHandler } from '@self/lib/types';

let setup: DbApiHandler = (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.json({ status: 'error' });
  }

  return res.json({ status: 'ok' });
};

export default setup;
