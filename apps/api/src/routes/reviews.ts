import { Router, Request, Response } from "express";
import { prisma } from "@ai-review/database";
import { z } from "zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { businessId, filter, page = "1", limit = "20" } = req.query;

    const where: any = {};
    if (businessId) where.businessId = businessId as string;
    if (filter === "unanswered") where.isReplied = false;
    if (filter === "answered") where.isReplied = true;
    if (filter === "5") where.rating = 5;
    if (filter === "4") where.rating = 4;
    if (filter === "1-2") where.rating = { lte: 2 };

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: { replies: true },
        orderBy: { reviewDate: "desc" },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.review.count({ where }),
    ]);

    res.json({
      reviews,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:reviewId/reply", async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { text, tone, userId } = req.body;

    const reply = await prisma.reviewReply.create({
      data: {
        reviewId,
        createdById: userId,
        text,
        tone,
        isPublished: false,
      },
    });

    res.json(reply);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:reviewId/publish", async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const { replyText, tone, userId } = req.body;

    // TODO: Publish to Google Business API
    // const googleReply = await googleBusinessService.publishReply(reviewId, replyText);

    const [reply] = await prisma.$transaction([
      prisma.reviewReply.create({
        data: {
          reviewId,
          createdById: userId,
          text: replyText,
          tone,
          isPublished: true,
          publishedAt: new Date(),
        },
      }),
      prisma.review.update({
        where: { id: reviewId },
        data: { isReplied: true },
      }),
    ]);

    res.json({ success: true, reply });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/stats/:businessId", async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;

    const [total, replied, ratings] = await Promise.all([
      prisma.review.count({ where: { businessId } }),
      prisma.review.count({ where: { businessId, isReplied: true } }),
      prisma.review.groupBy({
        by: ["rating"],
        where: { businessId },
        _count: { rating: true },
      }),
    ]);

    const totalRatings = ratings.reduce((sum, r) => sum + r.rating * r._count.rating, 0);
    const avgRating = total > 0 ? totalRatings / total : 0;

    res.json({
      total,
      replied,
      unanswered: total - replied,
      responseRate: total > 0 ? Math.round((replied / total) * 100) : 0,
      avgRating: Math.round(avgRating * 10) / 10,
      ratingDistribution: ratings,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as reviewRoutes };
