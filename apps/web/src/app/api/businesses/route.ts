import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { ensureUser } from "@/lib/ensure-user";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, city, address, phone, website } = await req.json();
  if (!name || !type || !city) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const user = await ensureUser(userId);

    const business = await prisma.business.create({
      data: {
        name,
        type,
        city,
        address: address || null,
        phone: phone || null,
        website: website || null,
        members: {
          create: { userId: user.id, role: "ADMIN" },
        },
      },
    });

    return NextResponse.json({ business });
  } catch (error: any) {
    console.error("Create business error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await ensureUser(userId);

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
