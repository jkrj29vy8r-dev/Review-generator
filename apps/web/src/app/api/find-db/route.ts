import { NextResponse } from "next/server";
import * as net from "net";
import * as tls from "tls";

const PROJECT = "vvluuegrolplpmoaajyq";
const PASSWORD = "Narcis.24.05.06";
const PORT = 6543;

const REGIONS = ["eu-west-1", "eu-west-2", "eu-central-1", "eu-north-1"];

// Send PostgreSQL startup packet and check if pooler recognises the tenant
function probePgHost(host: string): Promise<string> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => { socket.destroy(); resolve("timeout"); }, 4000);

    const socket = net.createConnection({ host, port: PORT }, () => {
      // PostgreSQL startup message: length(4) + protocol(4) + user param
      const user = `postgres.${PROJECT}`;
      const db = "postgres";
      const msg = Buffer.alloc(4 + 4 + 5 + user.length + 1 + 9 + db.length + 1 + 1);
      let offset = 0;
      msg.writeInt32BE(msg.length, offset); offset += 4;
      msg.writeInt32BE(196608, offset); offset += 4; // protocol 3.0
      msg.write("user\0", offset, "utf8"); offset += 5;
      msg.write(user + "\0", offset, "utf8"); offset += user.length + 1;
      msg.write("database\0", offset, "utf8"); offset += 9;
      msg.write(db + "\0", offset, "utf8"); offset += db.length + 1;
      msg[offset] = 0; // terminator
      socket.write(msg);
    });

    socket.on("data", (data) => {
      clearTimeout(timer);
      socket.destroy();
      const str = data.toString("utf8");
      if (str.includes("tenant") || str.includes("not found")) resolve("tenant_not_found");
      else if (str.includes("password") || data[0] === 0x52) resolve("auth_requested"); // R = auth
      else if (data[0] === 0x45) resolve("error:" + str.slice(5, 80)); // E = error
      else resolve("connected:" + data[0]);
    });

    socket.on("error", (e) => { clearTimeout(timer); resolve("error:" + e.message.slice(0, 40)); });
  });
}

export async function GET() {
  const currentUrl = (process.env.DATABASE_URL ?? "NOT SET").replace(/:([^:@\n\r]+)@/, ":***@").trim();
  const results: Record<string, string> = {};

  for (const region of REGIONS) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    results[region] = await probePgHost(host);
  }

  const working = Object.entries(results).find(([, v]) => v === "auth_requested")?.[0];
  const recommended = working
    ? `postgresql://postgres.${PROJECT}:${PASSWORD}@aws-0-${working}.pooler.supabase.com:${PORT}/postgres?pgbouncer=true&connection_limit=1`
    : null;

  return NextResponse.json({ currentUrl, results, working, recommended }, { status: 200 });
}
