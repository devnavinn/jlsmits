import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Read directly rather than with env(): `prisma generate` runs on install, before a URL may exist.
    url: process.env.DATABASE_URL ?? "",
  },
});
