// This file is used to configure Knex.js for database migrations and seeds.
import type { Knex } from "knex";

const knexfile: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database.db",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    useNullAsDefault: true, // Required for SQLite
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default knexfile;

// In Vercel:
/*
Go to Project → Settings → Environment Variables.

Add these:

ini
Copy
Edit
NODE_ENV = production
DB_HOST = your_host
DB_PORT = 5432
DB_USER = your_user
DB_PASSWORD = your_password
DB_DATABASE = your_db_name
DB_SSL = true    // if needed (e.g., Railway, Supabase)
*/
