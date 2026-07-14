import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, avatarUrl } = body;

  try {
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
