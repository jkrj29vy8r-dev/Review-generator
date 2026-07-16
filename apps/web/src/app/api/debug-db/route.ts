import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL ?? "NOT SET";
  const masked = url.replace(/:([^:@]+)@/, ":***@");

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, url: masked });
  } catch (error: any) {
    return NextResponse.json({ ok: false, url: masked, error: error.message });
  }
}
