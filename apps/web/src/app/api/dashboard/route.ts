import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        subscription: true,
        businesses: {
          include: {
            business: {
              include: {
                reviews: { orderBy: { reviewDate: "desc" }, take: 5 },
              },
            },
          },
        },
      },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const allBusinesses = user.businesses.map((bm: any) => bm.business);
    const allReviews = allBusinesses.flatMap((b: any) => b.reviews);
    const unanswered = allReviews.filter((r: any) => !r.isReplied).length;
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / allReviews.length
        : 0;

    const recentReviews = allReviews
      .sort((a: any, b: any) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())
      .slice(0, 5);

    return NextResponse.json({
      totalReviews: allReviews.length,
      unanswered,
      avgRating: Math.round(avgRating * 10) / 10,
      businessCount: allBusinesses.length,
      subscription: user.subscription,
      recentReviews,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
