import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

let options = {
  site: process.env.SITE ?? 'http://localhost:3000',
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
};

let handler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, options);
};

export default handler;
