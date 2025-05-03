import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent webpack from bundling optional knex dialects like 'oracledb'
      config.externals.push({
        oracledb: "commonjs oracledb",
        mysql: "commonjs mysql",
        mysql2: "commonjs mysql2",
        pg: "commonjs pg", // optional: also keep 'pg' external if needed
        better_sqlite3: "commonjs better-sqlite3",
        sqlite3: "commonjs sqlite3",
      });
    }
    return config;
  },
};

export default nextConfig;
