import knex from "knex";

import knexfile from "./knexfile";

// type KnexConfigKeys = "development" | "staging" | "production";

// TODO: In Prod, don't access knexfile.development directly
// but use environment variables for database connection
// and set the environment variable NODE_ENV=production
const environment = process.env.NODE_ENV || "development";
const config = knexfile[environment as keyof typeof knexfile];

if (!config) {
  throw new Error(`Knex configuration missing for environment: ${environment}`);
}

console.log("NODE_ENV is:", process.env.NODE_ENV);

const db = knex(config);

export default db;
