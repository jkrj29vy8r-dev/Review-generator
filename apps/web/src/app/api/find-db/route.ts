import { NextResponse } from "next/server";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL?.trim() ?? "NOT SET";
  const masked = url.replace(/:([^:@\n\r]+)@/, ":***@");

  // Test Supabase REST API - does not need DB connection
  let supabaseOk = false;
  let supabaseError = "";
  try {
    const apiUrl = "https://vvluuegrolplpmoaajyq.supabase.co/rest/v1/User?limit=1";
    const res = await fetch(apiUrl, {
      headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
      },
    });
    supabaseOk = res.status < 500;
    supabaseError = `status=${res.status}`;
  } catch (e: any) {
    supabaseError = e.message;
  }

  return NextResponse.json({
    databaseUrl: masked,
    supabaseApiReachable: supabaseOk,
    supabaseStatus: supabaseError,
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });
}
