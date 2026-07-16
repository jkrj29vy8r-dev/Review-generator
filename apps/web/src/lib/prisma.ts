import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function buildDatabaseUrl(): string | undefined {
  const explicit = process.env.DATABASE_URL?.trim().replace(/[\r\n\s]+/g, "");
  if (explicit && !explicit.includes("example.com")) return explicit;

  // Fallback: construct from individual parts
  const host = process.env.DB_HOST?.trim();
  const port = process.env.DB_PORT?.trim() || "6543";
  const user = process.env.DB_USER?.trim();
  const pass = process.env.DB_PASS?.trim();
  const name = process.env.DB_NAME?.trim() || "postgres";
  if (host && user && pass) {
    return `postgresql://${user}:${pass}@${host}:${port}/${name}?pgbouncer=true&connection_limit=1`;
  }

  return explicit;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasourceUrl: buildDatabaseUrl(),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
