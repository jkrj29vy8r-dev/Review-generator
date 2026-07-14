import { PrismaClient, UserRole, SubscriptionPlan, ReviewSentiment, ReplyTone } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@aireviewmanager.ro" },
    update: {},
    create: {
      clerkId: "demo_clerk_id",
      email: "demo@aireviewmanager.ro",
      name: "Demo User",
      role: UserRole.ADMIN,
      subscription: {
        create: {
          plan: SubscriptionPlan.PRO,
          aiRepliesUsed: 12,
          aiRepliesLimit: 999999,
        },
      },
    },
  });

  // Demo business
  const business = await prisma.business.upsert({
    where: { id: "demo_business_1" },
    update: {},
    create: {
      id: "demo_business_1",
      name: "Restaurant La Bunica",
      type: "restaurant",
      city: "București",
      address: "Str. Florilor 12, Sector 1",
      phone: "+40 21 000 0000",
      website: "https://labunica.ro",
      averageRating: 4.3,
      totalReviews: 124,
      defaultTone: ReplyTone.RESTAURANT,
      members: {
        create: {
          userId: user.id,
          role: UserRole.ADMIN,
        },
      },
    },
  });

  // Demo reviews
  const reviews = [
    {
      authorName: "Maria Ionescu",
      rating: 5,
      text: "Cel mai bun restaurant din București! Mâncarea a fost delicioasă, personalul foarte amabil. Cu siguranță revin!",
      sentiment: ReviewSentiment.POSITIVE,
      sentimentScore: 0.95,
    },
    {
      authorName: "Alexandru Popescu",
      rating: 4,
      text: "Mâncare foarte bună, prețuri ok. Singurul minus a fost că am așteptat puțin mai mult pentru comandă.",
      sentiment: ReviewSentiment.POSITIVE,
      sentimentScore: 0.72,
    },
    {
      authorName: "Elena Dumitrescu",
      rating: 2,
      text: "Am fost dezamăgit. Mâncarea a venit rece și chelnerul nu a fost deloc atent. Sper să se îmbunătățească.",
      sentiment: ReviewSentiment.NEGATIVE,
      sentimentScore: -0.65,
    },
    {
      authorName: "Ion Gheorghe",
      rating: 5,
      text: "Atmosferă superbă! Am celebrat ziua de naștere a soției și totul a fost perfect. Recomand cu căldură!",
      sentiment: ReviewSentiment.POSITIVE,
      sentimentScore: 0.92,
    },
    {
      authorName: "Andreea Stancu",
      rating: 3,
      text: "Mâncare ok, dar nu am fost impresionată. Prețurile sunt puțin mari față de calitate.",
      sentiment: ReviewSentiment.NEUTRAL,
      sentimentScore: -0.1,
    },
  ];

  for (const r of reviews) {
    await prisma.review.create({
      data: {
        businessId: business.id,
        ...r,
        reviewDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        isReplied: Math.random() > 0.5,
      },
    });
  }

  // Rating history
  for (let i = 30; i >= 0; i--) {
    await prisma.ratingHistory.create({
      data: {
        businessId: business.id,
        rating: 3.8 + Math.random() * 1.2,
        totalReviews: 100 + i,
        recordedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
