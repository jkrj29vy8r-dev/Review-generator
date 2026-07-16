import { NextResponse } from "next/server";
import * as net from "net";

const PROJECT = "vvluuegrolplpmoaajyq";
const PASSWORD = "Narcis.24.05.06";
const PORT = 6543;

const REGIONS = [
  "eu-west-1",
  "eu-west-2",
  "eu-west-3",
  "eu-central-1",
  "eu-central-2",
  "eu-north-1",
  "eu-south-1",
  "us-east-1",
  "us-west-1",
  "ap-southeast-1",
];

function testTCP(host: string, port: number, timeoutMs = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeoutMs);
    socket.on("connect", () => { socket.destroy(); resolve(true); });
    socket.on("timeout", () => { socket.destroy(); resolve(false); });
    socket.on("error", () => { socket.destroy(); resolve(false); });
    socket.connect(port, host);
  });
}

export async function GET() {
  const currentUrl = (process.env.DATABASE_URL ?? "NOT SET").replace(/:([^:@]+)@/, ":***@");
  const results: Record<string, boolean> = {};

  for (const region of REGIONS) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    results[host] = await testTCP(host, PORT);
  }

  const working = Object.entries(results).filter(([, ok]) => ok).map(([host]) => host);
  const recommended = working.length > 0
    ? `postgresql://postgres.${PROJECT}:${PASSWORD}@${working[0]}:${PORT}/postgres?pgbouncer=true&connection_limit=1`
    : null;

  return NextResponse.json({ currentUrl, results, working, recommended });
}
