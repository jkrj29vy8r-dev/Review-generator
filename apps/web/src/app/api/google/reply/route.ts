import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { postGoogleReply, refreshAccessToken } from "@/lib/google";
import { ensureUser } from "@/lib/ensure-user";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reviewId, replyText } = await req.json();
  if (!reviewId || !replyText) {
    return NextResponse.json({ error: "Missing reviewId or replyText" }, { status: 400 });
  }

  try {
    const user = await ensureUser(userId);

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { business: true },
    });
    if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    // Verify ownership
    const membership = await prisma.businessMember.findFirst({
      where: { userId: user.id, businessId: review.businessId },
    });
    if (!membership) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const business = review.business;

    if (!business.googleLocationId || !review.googleReviewId || !business.googleRefreshToken) {
      return NextResponse.json({ error: "Business not connected to Google" }, { status: 400 });
    }

    // Refresh token if needed
    let accessToken = business.googleAccessToken!;
    if (!business.googleTokenExpiry || business.googleTokenExpiry < new Date()) {
      accessToken = await refreshAccessToken(business.googleRefreshToken);
      await prisma.business.update({
        where: { id: business.id },
        data: {
          googleAccessToken: accessToken,
          googleTokenExpiry: new Date(Date.now() + 3600 * 1000),
        },
      });
    }

    // Post reply to Google
    await postGoogleReply(
      accessToken,
      business.googleLocationId,
      review.googleReviewId!,
      replyText
    );

    // Save reply in DB
    await prisma.reviewReply.create({
      data: {
        reviewId,
        createdById: user.id,
        text: replyText,
        tone: "PROFESIONAL",
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    await prisma.review.update({
      where: { id: reviewId },
      data: { isReplied: true },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Google reply error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
