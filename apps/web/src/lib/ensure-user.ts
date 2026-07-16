import { clerkClient } from "@clerk/nextjs";
import { prisma } from "./prisma";

export async function ensureUser(clerkId: string) {
  const existing = await prisma.user.findUnique({ where: { clerkId } });
  if (existing) return existing;

  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? `${clerkId}@replai.app`;
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || email;

  return prisma.user.upsert({
    where: { email },
    update: { clerkId, name },
    create: { clerkId, email, name },
  });
}
