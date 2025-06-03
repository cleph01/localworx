import type { Knex } from "knex";
import path from "path";

// This file is used to configure Knex for database migrations and seeds.
// It sets up the database connection and specifies where to find migrations and seeds.

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knexfile: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "database.db"), // resolves to db/database.db
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // e.g., from Vercel env vars
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default knexfile;
