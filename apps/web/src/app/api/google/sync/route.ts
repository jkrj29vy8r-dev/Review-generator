import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import {
  getGoogleReviews,
  refreshAccessToken,
  starRatingToNumber,
} from "@/lib/google";
import { ensureUser } from "@/lib/ensure-user";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { businessId } = await req.json();
  if (!businessId) return NextResponse.json({ error: "Missing businessId" }, { status: 400 });

  try {
    const user = await ensureUser(userId);

    // Verify user owns this business
    const membership = await prisma.businessMember.findFirst({
      where: { userId: user.id, businessId },
    });
    if (!membership) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const business = await prisma.business.findUnique({ where: { id: businessId } });
    if (!business?.googleLocationId || !business.googleRefreshToken) {
      return NextResponse.json({ error: "Business not connected to Google" }, { status: 400 });
    }

    // Refresh token if needed
    let accessToken = business.googleAccessToken!;
    if (!business.googleTokenExpiry || business.googleTokenExpiry < new Date()) {
      accessToken = await refreshAccessToken(business.googleRefreshToken);
      await prisma.business.update({
        where: { id: businessId },
        data: {
          googleAccessToken: accessToken,
          googleTokenExpiry: new Date(Date.now() + 3600 * 1000),
        },
      });
    }

    const reviews = await getGoogleReviews(accessToken, business.googleLocationId);
    let synced = 0;

    for (const r of reviews) {
      const rating = starRatingToNumber(r.starRating);
      const isReplied = !!r.reviewReply;

      await prisma.review.upsert({
        where: { googleReviewId: r.reviewId },
        create: {
          googleReviewId: r.reviewId,
          businessId,
          authorName: r.reviewer.displayName,
          authorPhotoUrl: r.reviewer.profilePhotoUrl ?? null,
          rating,
          text: r.comment ?? "",
          reviewDate: new Date(r.createTime),
          isReplied,
        },
        update: {
          rating,
          text: r.comment ?? "",
          isReplied,
        },
      });

      synced++;
    }

    // Update business stats
    const allReviews = await prisma.review.findMany({
      where: { businessId },
      select: { rating: true },
    });
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((s: number, r: any) => s + r.rating, 0) / allReviews.length
        : 0;

    await prisma.business.update({
      where: { id: businessId },
      data: {
        totalReviews: allReviews.length,
        averageRating: Math.round(avgRating * 10) / 10,
      },
    });

    return NextResponse.json({ synced, total: allReviews.length });
  } catch (error: any) {
    console.error("Google sync error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
