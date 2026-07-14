import { Router, Request, Response } from "express";
import { prisma } from "@ai-review/database";

const router = Router();

router.get("/:businessId", async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const { period = "30" } = req.query;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period as string));

    const [
      totalReviews,
      repliedReviews,
      avgRating,
      ratingHistory,
      sentimentBreakdown,
    ] = await Promise.all([
      prisma.review.count({ where: { businessId } }),
      prisma.review.count({ where: { businessId, isReplied: true } }),
      prisma.review.aggregate({
        where: { businessId },
        _avg: { rating: true },
      }),
      prisma.ratingHistory.findMany({
        where: { businessId, recordedAt: { gte: daysAgo } },
        orderBy: { recordedAt: "asc" },
      }),
      prisma.review.groupBy({
        by: ["sentiment"],
        where: { businessId },
        _count: { sentiment: true },
      }),
    ]);

    const responseRate = totalReviews > 0
      ? Math.round((repliedReviews / totalReviews) * 100)
      : 0;

    const timeSavedMinutes = Math.round(repliedReviews * 0.6 * 5);

    res.json({
      totalReviews,
      repliedReviews,
      unansweredReviews: totalReviews - repliedReviews,
      responseRate,
      avgRating: Math.round((avgRating._avg.rating || 0) * 10) / 10,
      timeSavedMinutes,
      ratingHistory,
      sentimentBreakdown,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/admin/overview", async (_req: Request, res: Response) => {
  try {
    const [totalUsers, totalBusinesses, totalReviews, totalReplies] = await Promise.all([
      prisma.user.count(),
      prisma.business.count(),
      prisma.review.count(),
      prisma.reviewReply.count({ where: { isPublished: true } }),
    ]);

    res.json({ totalUsers, totalBusinesses, totalReviews, totalReplies });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as analyticsRoutes };
