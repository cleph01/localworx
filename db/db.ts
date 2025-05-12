import knex, { Knex } from "knex";
import knexfile from "./knexfile";

const environment = process.env.NODE_ENV || "development";
const config = knexfile[environment as keyof typeof knexfile];

// Prevent multiple instances in development (hot reload)
declare global {
  var __knex: Knex | undefined;
}

const db = global.__knex ?? knex(config);

if (process.env.NODE_ENV !== "production") {
  global.__knex = db;
}

export default db;
