import { PrismaClient } from "@prisma/client";

// Prisma 7 configuration - pass adapter when connecting directly to a database
// for Accelerate you could instead use: new PrismaClient({ accelerateUrl: process.env.PRISMA_ACCELERATE_URL })

// constructor options are unnecessary in the current setup.  Prisma
// automatically reads the datasource URL from `prisma.config.ts` /
// process.env.DATABASE_URL during runtime, and passing a custom property
// such as `datasourceUrl` triggers an error in older versions (and isn’t
// recognised by the engine at all).
const prisma = new PrismaClient();
// For Prisma Accelerate you would instead pass { accelerateUrl: process.env.PRISMA_ACCELERATE_URL } here.

export default prisma;
