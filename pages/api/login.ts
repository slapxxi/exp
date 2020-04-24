import { RequestHandler } from '@self/lib/types';

let login: RequestHandler = async (req, res) => {
  res.setHeader('Set-Cookie', `token=wow; Expires=${new Date(Date.now() + secondsToMs(120))}`);
  res.json({ token: 'wow' });
};

function secondsToMs(n: number) {
  return n * 1000;
}

export default login;
