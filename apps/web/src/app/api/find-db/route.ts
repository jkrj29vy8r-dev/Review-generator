import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const PROJECT = "vvluuegrolplpmoaajyq";
const PASSWORD = "Narcis.24.05.06";

const REGIONS = [
  "eu-west-1",
  "eu-west-2",
  "eu-central-1",
  "eu-north-1",
];

async function testPrisma(region: string): Promise<{ ok: boolean; error?: string }> {
  const url = `postgresql://postgres.${PROJECT}:${PASSWORD}@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;
  const client = new PrismaClient({ datasourceUrl: url });
  try {
    await client.$queryRaw`SELECT 1`;
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e.message?.slice(0, 120) };
  } finally {
    await client.$disconnect().catch(() => {});
  }
}

export async function GET() {
  const currentUrl = (process.env.DATABASE_URL ?? "NOT SET").replace(/:([^:@\n]+)@/, ":***@");
  const results: Record<string, { ok: boolean; error?: string }> = {};

  for (const region of REGIONS) {
    results[region] = await testPrisma(region);
  }

  const working = Object.entries(results).find(([, v]) => v.ok)?.[0];
  const recommended = working
    ? `postgresql://postgres.${PROJECT}:${PASSWORD}@aws-0-${working}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`
    : null;

  return NextResponse.json({ currentUrl, results, working, recommended });
}
