import { clerkClient } from "@clerk/nextjs";
import { prisma } from "./prisma";

/**
 * Gets or creates the DB user for a given Clerk userId.
 * This is a fallback for when the Clerk webhook hasn't fired yet.
 */
export async function ensureUser(clerkId: string) {
  const existing = await prisma.user.findUnique({ where: { clerkId } });
  if (existing) return existing;

  // Fetch from Clerk and create
  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || email;

  return prisma.user.create({
    data: {
      clerkId,
      email,
      name,
      plan: "FREE",
    },
  });
}
