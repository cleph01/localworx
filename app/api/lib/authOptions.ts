import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import db from "../../../db/db";
import { CustomAdapter } from "./CustomAdapter";

export const authOptions: NextAuthOptions = {
  adapter: CustomAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      console.log("Session callback fired. Session:", session);
      console.log("User:", user);
      if (session.user) {
        // Add user ID to session object
        session.user.id = user.id;
        session.user.role = (user as any).role; // bypass TypeScript check
      }

      return session;
    },
  },
};
