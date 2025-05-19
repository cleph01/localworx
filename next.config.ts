import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }) => {
    // 👇 Your existing externals logic for server build
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

    // 👇 This to prevent Webpack from trying to resolve `fs` on the client
    // This is important to address/mitigate when deploying to Vercel because
    // `fs` is a Node.js module and should not be bundled for the client
    // If you are using a library that requires `fs`, you should use dynamic
    // imports or lazy loading to load it only on the server side
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
        },
      };
    }

    return config;
  },
};

export default nextConfig;
