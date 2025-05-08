import type { Knex } from "knex";
import path from "path";

/***
// For next-auth to work initially
//
***/

// const rootDir = process.cwd(); // always resolves to project root, even after Next.js builds

// const knexfile: { [key: string]: Knex.Config } = {
//   development: {
//     client: "sqlite3",
//     connection: {
//       filename: path.join(rootDir, "db", "database.db"),
//     },
//     migrations: {
//       directory: path.join(rootDir, "db", "migrations"),
//     },
//     seeds: {
//       directory: path.join(rootDir, "db", "seeds"),
//     },
//     useNullAsDefault: true,
//   },

//   production: {
//     client: "postgresql",
//     connection: {
//       database: process.env.DB_DATABASE,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       host: process.env.DB_HOST,
//       port: Number(process.env.DB_PORT) || 5432,
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//       directory: path.join(rootDir, "db", "migrations"),
//     },
//     seeds: {
//       directory: path.join(rootDir, "db", "seeds"),
//     },
//   },
// };

/***
//
// For Rollbacks
//
***/

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
};

/***
// Third Try
***/

// import { fileURLToPath } from "url";

// // Required for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const databasePath = path.join(__dirname, "database.db");

// const knexfile: { [key: string]: Knex.Config } = {
//   development: {
//     client: "sqlite3",
//     connection: {
//       filename: databasePath,
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: path.join(__dirname, "migrations"),
//     },
//     seeds: {
//       directory: path.join(__dirname, "seeds"),
//     },
//   },
// };

export default knexfile;
