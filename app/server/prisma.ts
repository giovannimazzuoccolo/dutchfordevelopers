import { PrismaClient } from "@prisma/client";

// Prisma 7 configuration - pass adapter when connecting directly to a database
// for Accelerate you could instead use: new PrismaClient({ accelerateUrl: process.env.PRISMA_ACCELERATE_URL })

const prisma = new PrismaClient({
  // If you prefer to pass the connection string directly at runtime, use `datasourceUrl`.
  // The URL is also configured for migrations in prisma.config.ts so you can omit this.
  datasourceUrl: process.env.DATABASE_URL,
});
// For Prisma Accelerate you would instead pass { accelerateUrl: process.env.PRISMA_ACCELERATE_URL } here.

export default prisma;
