import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/server/db/client";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "dashboard",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "enter the admin email" },
        password: { label: "Password", type: "password", placeholder: "enter the admin password" },
      },
      async authorize(credentials) {
        const user = await prisma.PizzaroAdmin.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

function checkPassword(password, dbPassword) {
  if (password === dbPassword) {
    return true;
  }
  return false;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
