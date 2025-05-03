// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { KnexAdapter } from "authjs-knexjs-adapter";
import db from "../../../../db/db"; // assuming your db.ts is in db/
import GitHubProvider from "next-auth/providers/github"; // or others

const handler = NextAuth({
  adapter: KnexAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Add more providers here
  ],
  session: {
    strategy: "database", // necessary for using KnexAdapter
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // attach userId to session object
      return session;
    },
  },
  // optional custom pages
  //   pages: {
  //     signIn: "/signin",
  //   },
});

export { handler as GET, handler as POST };
