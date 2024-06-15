// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextApiHandler } from 'next';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'default-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default-client-secret',
    }),
  ],
  pages: {
    newUser: '/send-otp',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',

  },
});

export { authHandler as GET, authHandler as POST };
