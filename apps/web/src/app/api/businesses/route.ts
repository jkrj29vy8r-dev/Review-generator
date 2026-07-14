import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ businesses: [] });

    const members = await prisma.businessMember.findMany({
      where: { userId: user.id },
      include: {
        business: {
          include: {
            _count: { select: { reviews: true } },
            reviews: {
              where: { isReplied: false },
              select: { id: true },
            },
          },
        },
      },
    });

    const businesses = members.map((m: any) => ({
      id: m.business.id,
      name: m.business.name,
      type: m.business.type,
      city: m.business.city,
      address: m.business.address,
      rating: m.business.averageRating,
      totalReviews: m.business._count.reviews,
      unanswered: m.business.reviews.length,
      connected: !!m.business.googleLocationId,
      autoReply: m.business.autoReplyMode !== "DISABLED",
      role: m.role,
    }));

    return NextResponse.json({ businesses });
  } catch (error) {
    console.error("Businesses API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
