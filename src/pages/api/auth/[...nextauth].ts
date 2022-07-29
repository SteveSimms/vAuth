import NextAuth, { type NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"

// import {prisma} from "@prisma/client";
const prisma = new PrismaClient()
const log = console.log;
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  debug: true,
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
      
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      

    }),
   
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
      },
      async authorize(credentials, _req) {
        const user = { id: 1, name: credentials?.name ?? "S Simms" };
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
//NEXTAUTH_URL=https://v-auth.vercel.app/