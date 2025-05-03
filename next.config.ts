import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }) => {
    if (isServer && config.externals) {
      const externals = config.externals as (
        | string
        | { [key: string]: string }
      )[];
      externals.push({
        oracledb: "commonjs oracledb",
        mysql: "commonjs mysql",
        mysql2: "commonjs mysql2",
        pg: "commonjs pg",
        better_sqlite3: "commonjs better-sqlite3",
        sqlite3: "commonjs sqlite3",
      });
      config.externals = externals;
    }
    return config;
  },
};

export default nextConfig;
