import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "@ai-review/database";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

router.post("/stripe", async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.userId;

      if (userId) {
        await prisma.subscription.upsert({
          where: { userId },
          create: {
            userId,
            plan: "PRO",
            status: "ACTIVE",
            stripeSubscriptionId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            aiRepliesLimit: 999999,
          },
          update: {
            status: subscription.status === "active" ? "ACTIVE" : "INACTIVE",
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.userId;

      if (userId) {
        await prisma.subscription.update({
          where: { userId },
          data: { plan: "FREE", status: "CANCELED", aiRepliesLimit: 30 },
        });
      }
      break;
    }
  }

  res.json({ received: true });
});

export { router as webhookRoutes };
