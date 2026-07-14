import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ reviews: [], total: 0 });

    const members = await prisma.businessMember.findMany({
      where: { userId: user.id },
      select: { businessId: true },
    });
    const businessIds = members.map((m: any) => m.businessId);

    const where: any = {
      businessId: { in: businessIds },
    };

    if (filter === "unanswered") where.isReplied = false;
    if (filter === "answered") where.isReplied = true;
    if (filter === "negative") where.rating = { lte: 2 };
    if (filter === "positive") where.rating = { gte: 4 };
    if (search) {
      where.OR = [
        { reviewText: { contains: search, mode: "insensitive" } },
        { authorName: { contains: search, mode: "insensitive" } },
      ];
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { reviewDate: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          business: { select: { name: true, type: true, city: true } },
          replies: { take: 1 },
        },
      }),
      prisma.review.count({ where }),
    ]);

    return NextResponse.json({ reviews, total, page, limit });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
