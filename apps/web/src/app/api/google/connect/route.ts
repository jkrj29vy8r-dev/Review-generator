import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getGoogleAuthUrl } from "@/lib/google";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");
  if (!businessId) return NextResponse.json({ error: "Missing businessId" }, { status: 400 });

  const url = getGoogleAuthUrl(businessId);
  return NextResponse.redirect(url);
}
