import { Router, Request, Response } from "express";
import { prisma } from "@ai-review/database";
import { z } from "zod";

const router = Router();

const CreateBusinessSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  city: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  userId: z.string(),
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const businesses = await prisma.business.findMany({
      where: userId ? { members: { some: { userId: userId as string } } } : undefined,
      include: {
        _count: { select: { reviews: true } },
        members: { include: { user: true } },
      },
    });

    res.json(businesses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = CreateBusinessSchema.parse(req.body);

    const business = await prisma.business.create({
      data: {
        name: data.name,
        type: data.type,
        city: data.city,
        address: data.address,
        phone: data.phone,
        website: data.website,
        members: {
          create: { userId: data.userId, role: "ADMIN" },
        },
      },
    });

    res.status(201).json(business);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id/auto-reply", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { mode, tone } = req.body;

    const business = await prisma.business.update({
      where: { id },
      data: {
        autoReplyMode: mode,
        ...(tone && { defaultTone: tone }),
      },
    });

    res.json(business);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/sync-google", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TODO: Sync with Google Business API
    // const googleData = await googleBusinessService.syncLocation(id);

    res.json({
      success: true,
      message: "Sincronizare Google Business în curs",
      syncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as businessRoutes };
