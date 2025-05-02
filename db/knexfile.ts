// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// Ensure this file exports the knex configuration
const knexfile = {
  development: {
    client: "sqlite3", // Use 'sqlite3' for SQLite database
    connection: {
      filename: "./database.db", // Path to your SQLite DB file
    },
    migrations: {
      directory: "./migrations", // Path to your migrations directory
    },
    seeds: {
      directory: "./seeds", // Optional: if you're using seeds
    },
    useNullAsDefault: true, // SQLite requires this option
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default knexfile;
