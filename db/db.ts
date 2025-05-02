const knex = require("knex");
const knexfile = require("./knexfile.ts");

// TODO: In Prod, don't access knexfile.development directly
// but use environment variables for database connection
// and set the environment variable NODE_ENV=production
// to use the production database
const db = knex(knexfile.development);

module.exports = db;
