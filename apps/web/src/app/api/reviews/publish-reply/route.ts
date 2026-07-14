import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reviewId, replyText, tone } = await req.json();

  try {
    // TODO: Integrate with Google Business API to publish reply
    // For now, save to database
    console.log(`Publishing reply for review ${reviewId}: ${replyText}`);

    return NextResponse.json({
      success: true,
      message: "Răspuns publicat cu succes",
      publishedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Nu s-a putut publica răspunsul" },
      { status: 500 }
    );
  }
}
