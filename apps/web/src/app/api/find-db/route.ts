import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const maxDuration = 30;

const PROJECT = "vvluuegrolplpmoaajyq";
const PASS = "Narcis.24.05.06";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const region = searchParams.get("region") || "eu-west-1";

  const url = `postgresql://postgres.${PROJECT}:${PASS}@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&connect_timeout=5`;
  const client = new PrismaClient({ datasourceUrl: url });

  try {
    await client.$queryRaw`SELECT 1 as ok`;
    return NextResponse.json({ region, status: "WORKS", url: url.replace(PASS, "***") });
  } catch (e: any) {
    return NextResponse.json({ region, status: "FAILED", error: e.message?.slice(0, 200), url: url.replace(PASS, "***") });
  } finally {
    await client.$disconnect().catch(() => {});
  }
}
