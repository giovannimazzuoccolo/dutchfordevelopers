// Prisma configuration file (prisma.config.ts)
// Connection URLs are no longer allowed in the schema; they belong in this config.
// Migrate (and other CLI commands) will read from `datasource.url` here.

import "dotenv/config"; // load .env variables during CLI runs
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
    // you can also specify a shadowDatabaseUrl here if you need one,
    // e.g.:
    // shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL ?? "",
  },
  // migrations defaults to "./prisma/migrations" so no need to set it explicitly
});
