// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';

const authOptions = {
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
};

const handler = NextAuth(authOptions);

export async function GET(req: NextRequest) {
  return handler(req, new NextResponse());
}

export async function POST(req: NextRequest) {
  return handler(req, new NextResponse());
}
