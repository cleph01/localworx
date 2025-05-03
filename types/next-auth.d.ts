// types/next-auth.d.ts
// This file is used to extend the NextAuth types
// to include the user ID in the session object.
// This is necessary for TypeScript to recognize the user ID in the session object
// when using the KnexAdapter.
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
