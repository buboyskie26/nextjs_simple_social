import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';

// const prisma = new PrismaClient();

import prisma from '@/db';

const clientId =
  '997182019581-otkffueeus1nmff5kcbead6rgs4tgdcf.apps.googleusercontent.com';
const clientSecret = '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';

type SessionProps = {
  session: any;
  token: any;
};

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      // clientId should not return as undefined
      // process.env returns an undefined, so '!', tells that process.env always not undefined
      // clientId: clientId!,
      // clientSecret: clientSecret!,
      clientId: process.env.clientId!,
      clientSecret: process.env.clientSecret!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }: SessionProps) => {
      if (session?.user) {
        session.user.id = token.sub;
        delete session.user.email; // sanitize data for security
      }
      return session;
    },
  },
};
export default authOptions;
