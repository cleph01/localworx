import knex from "knex";

import knexfile from "./knexfile";

type KnexConfigKeys = "development" | "staging" | "production";

// TODO: In Prod, don't access knexfile.development directly
// but use environment variables for database connection
// and set the environment variable NODE_ENV=production
const environment = process.env.NODE_ENV || "development";
const config = knexfile[environment as KnexConfigKeys];

const db = knex(config);

export default db;
