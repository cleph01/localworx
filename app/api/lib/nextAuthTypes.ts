export interface AdapterUser {
  id: string;
  email: string; // required, not optional or nullable
  emailVerified: Date | null;
  name: string | null;
  image: string | null;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role?: "user" | "admin" | string;
  phone_number?: string | null;
}

export interface Account {
  id: number;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}

export interface Session {
  sessionToken: string;
  userId: string;
  expires: Date;
  id?: string; // Add this
}

export interface VerificationToken {
  identifier: string;
  token: string;
}

// Adapter function input types
export interface AccountIdentifier {
  provider: string;
  providerAccountId: string;
}
