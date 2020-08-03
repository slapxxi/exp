import { NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

let login: NextApiHandler = async (req, res) => {
  req.session.set('username', { username: 'pp' });
  req.session.set('password', { pass: 'pp' });
  await req.session.save();
  res.json({ status: 'ok' });
};

function secondsToMs(n: number) {
  return n * 1000;
}

export default withIronSession(login, {
  cookieName: 'session',
  password: 'UKEKmXRMs4CnoNjQELmpLTfLFpL5PapM5V',
  cookieOptions: {
    secure: false,
  },
});
