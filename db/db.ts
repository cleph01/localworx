import knex from "knex";

import knexfile from "./knexfile";

// TODO: In Prod, don't access knexfile.development directly
// but use environment variables for database connection
// and set the environment variable NODE_ENV=production
// to use the production database
const db = knex(knexfile.development);

export default db;
