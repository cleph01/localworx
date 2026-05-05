import type { Knex } from "knex";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase passwords can contain special URL characters (?, #, !, etc.) that break
// standard URL parsers. This encodes only the password portion of the connection string.
function encodePostgresUrl(url: string): string {
  const match = url.match(/^(postgresql:\/\/[^:]+:)([^@]+)(@.+)$/);
  if (!match) return url;
  const [, prefix, password, suffix] = match;
  return prefix + encodeURIComponent(password) + suffix;
}

const migrateUrl = process.env.MIGRATE_DATABASE_URL
  ? encodePostgresUrl(process.env.MIGRATE_DATABASE_URL)
  : undefined;

const productionUrl = process.env.DATABASE_URL
  ? encodePostgresUrl(process.env.DATABASE_URL)
  : undefined;

const knexfile: { [key: string]: Knex.Config } = {
  // Used by Next.js dev server at runtime (NODE_ENV=development)
  // Shares the same Supabase project as production.
  development: {
    client: "pg",
    connection: {
      connectionString: productionUrl,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
    pool: {
      min: 0,
      max: 10,
    },
  },

  // Used at runtime by Next.js API routes — connects via Supabase connection pooler
  // (Transaction mode, port 6543). Knex's own pool is disabled (min: 0) to avoid
  // exhausting pooler connections in a serverless environment.
  production: {
    client: "pg",
    connection: {
      connectionString: productionUrl,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
    pool: {
      min: 0,
      max: 10,
    },
  },

  // Used only for running migrations and seeds — connects via the direct Supabase
  // connection (port 5432), which supports DDL statements that the pooler cannot handle.
  migrate: {
    client: "pg",
    connection: {
      connectionString: migrateUrl,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "seeds"),
    },
  },
};

export default knexfile;
