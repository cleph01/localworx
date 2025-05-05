// import type { Adapter } from "next-auth/adapters";
import type { Knex } from "knex";
import type {
  AdapterUser,
  User,
  Account,
  Session,
  VerificationToken,
  AccountIdentifier,
} from "./nextAuthTypes";

// generate a random UUID for the session token
import { randomUUID } from "crypto";

/**
 * An adapter for Auth.js/NextAuth.js to allow you to connect to any database
 * service via Knex.js.
 *
 * @param {Knex} knex - The Knex.js connection
 * @param options - Auth.js options
 * @returns {CustomAdapter} - Our custom Auth.js adapter for Knex.js to keep table names consistent and allow for
 *   easy migration to other databases. Keeps lowercase table names and snake_case columns.
 */

export function CustomAdapter(knex: Knex) {
  return {
    async createUser(user: User) {
      const tempUser = {
        ...user,
        id: randomUUID(), // Generate a new UUID for the user
      };
      // Insert user and return it
      const inserted = await knex("users").insert(tempUser).returning("*");

      // SQLite returns an array — get the first element
      const newUser = inserted[0];

      //   // Get the full row that was just inserted
      //   const dbUsers = await knex("users")
      //     .select("*")
      //     .where({ email: user.email })
      //     .limit(1);
      //   // Return the newly inserted user data
      //   return dbUsers[0];

      // Return in AdapterUser shape
      console.log("New user created:", newUser);

      // Transform the User object to match AdapterUser
      return {
        id: newUser.id ?? "", // Generate a new UUID for the user
        name: newUser.name ?? null,
        email: newUser.email ?? "",
        emailVerified: newUser.emailVerified ?? null,
        image: newUser.image ?? null,
      };
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      // Get a user row based on the id
      const dbUsers: User[] = await knex("users")
        .select("*")
        .where({ id })
        .limit(1);

      // If no user was found, return null, else Return the user data
      if (dbUsers.length === 0) return null;

      const user = dbUsers[0];
      // Transform the User object to match AdapterUser
      return {
        id: user.id,
        email: user.email || "", // Ensure email is a string
        emailVerified: user.emailVerified || null,
        name: user.name || null,
        image: user.image || null,
      };
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      // Get a user row based on the email
      const dbUsers = await knex("users").select("*").where({ email }).limit(1);
      // If no user was found, return null, else Return the user data
      if (dbUsers.length === 0) return null;

      const user = dbUsers[0];
      // Transform the User object to match AdapterUser
      return {
        id: user.id,
        email: user.email || "", // Ensure email is a string
        emailVerified: user.emailVerified || null,
        name: user.name || null,
        image: user.image || null,
      };
    },

    async getUserByAccount({
      provider,
      providerAccountId,
    }: AccountIdentifier): Promise<AdapterUser | null> {
      // Get a user row based on the associated account given the unique
      // provider account id and provider
      const dbUsers = await knex("users")
        .select("users.*")
        .join("accounts", "accounts.userId", "=", "users.id")
        .where({
          "accounts.provider": provider,
          "accounts.providerAccountId": providerAccountId,
        })
        .limit(1);

      // If no user was found, return null, else Return the user data
      if (dbUsers.length === 0) return null;

      const user = dbUsers[0];
      // Transform the User object to match AdapterUser
      return {
        id: user.id,
        email: user.email || "", // Ensure email is a string
        emailVerified: user.emailVerified || null,
        name: user.name || null,
        image: user.image || null,
      };
    },

    async updateUser(user: User) {
      // Update a user row based on id
      await knex("users").where({ id: user.id }).update(user);
      // Get the row that was just updated
      const dbUsers = await knex("users")
        .select("*")
        .where({ id: user.id })
        .limit(1);
      // Return the user data
      return dbUsers[0];
    },

    async deleteUser(userId: string) {
      // Delete session data for the given user
      await knex("sessions").where({ userId }).del();
      // Delete account data for the given user
      await knex("accounts").where({ userId }).del();
      // Delete user data for the given user
      await knex("users").where({ id: userId }).del();
    },

    async linkAccount(account: Account) {
      // Insert account data into `accounts` table
      await knex("accounts").insert(account);
      // Get the row that was just inserted
      const dbAccounts = await knex("accounts")
        .select("*")
        .where({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        })
        .limit(1);
      // Return the account data
      return dbAccounts[0];
    },

    async unlinkAccount({ provider, providerAccountId }: AccountIdentifier) {
      // Delete an account row based on provider information
      await knex("accounts").where({ provider, providerAccountId }).del();
    },

    async createSession(session: Session) {
      // Insert a session row into the `Session` table
      await knex("sessions").insert(session);
      // Get the row that was just inserted
      const dbSessions = await knex("sessions")
        .select("*")
        .where({ sessionToken: session.sessionToken })
        .limit(1);

      // Some database engines store datetimes as a numerical Unix epoch. If so,
      // convert it to a JavaScript date.
      if (typeof dbSessions[0]?.expires === "number") {
        dbSessions[0].expires = new Date(dbSessions[0].expires);
      }
      // Return the session data
      return dbSessions[0];
    },

    async getSessionAndUser(sessionToken: string) {
      // Get a session row based on the given token
      const dbSessions = await knex("sessions")
        .select("*")
        .where({ sessionToken })
        .limit(1);

      // If no session was found, return null
      if (dbSessions.length === 0) return null;

      // If session exists, get the user data for that session
      const dbUsers = await knex("users")
        .select("*")
        .where({ id: dbSessions[0].userId })
        .limit(1);

      // If no user was found, return null
      if (dbUsers.length === 0) return null;

      // Some database engines store datetimes as a numerical Unix epoch. If so,
      // convert it to a JavaScript date.
      if (typeof dbSessions[0].expires === "number") {
        dbSessions[0].expires = new Date(dbSessions[0].expires);
      }

      // Return the session and the user data
      return { session: dbSessions[0], user: dbUsers[0] };
    },

    async updateSession(session: Partial<Session> & { sessionToken: string }) {
      // Make sure sessionToken exists — it must!
      if (!session.sessionToken) throw new Error("Missing sessionToken");

      // Only update the fields that are provided
      await knex("sessions")
        .where({ sessionToken: session.sessionToken })
        .update({
          ...(session.userId !== undefined && { userId: session.userId }),
          ...(session.expires !== undefined && { expires: session.expires }),
        });

      // Get the session row that was just updated
      const dbSessions = await knex("sessions")
        .select("*")
        .where({ sessionToken: session.sessionToken })
        .limit(1);

      // Some database engines store datetimes as a numerical Unix epoch. If so,
      // convert it to a JavaScript date.
      if (typeof dbSessions[0]?.expires === "number") {
        dbSessions[0].expires = new Date(dbSessions[0].expires);
      }

      // Return the session data, ensuring it matches AdapterSession
      return dbSessions[0];
      //   return {
      //     sessionToken: dbSessions[0].sessionToken,
      //     userId: dbSessions[0].userId,
      //     expires: dbSessions[0].expires,
      //   };
    },

    async deleteSession(sessionToken: string) {
      // Get a session row based on the given token
      const dbSessions = await knex("sessions")
        .select("*")
        .where({ sessionToken })
        .limit(1);

      // Delete a session row based on the given token
      await knex("sessions").where({ sessionToken }).del();

      // Some database engines store datetimes as a numerical Unix epoch. If so,
      // convert it to a JavaScript date.
      if (typeof dbSessions[0]?.expires === "number") {
        dbSessions[0].expires = new Date(dbSessions[0].expires);
      }

      // Return the session data
      return dbSessions[0];
    },

    async createVerificationToken(verificationToken: VerificationToken) {
      // Insert a new verification token row into the `VerificationToken` table
      await knex("verification_tokens").insert(verificationToken);

      // Get the verification token that was just inserted
      const dbTokens = await knex("verification_tokens")
        .select("*")
        .where({ token: verificationToken.token })
        .limit(1);

      // Return the verification token data
      return dbTokens[0];
    },

    async useVerificationToken({ identifier, token }: VerificationToken) {
      // Get a verification token row based on id and token
      const dbTokens = await knex("verification_tokens")
        .select("*")
        .where({ identifier, token })
        .limit(1);

      // Delete that row
      await knex("verification_tokens").where({ identifier, token }).del();

      // Return the verification token data
      return dbTokens[0];
    },
  };
}
