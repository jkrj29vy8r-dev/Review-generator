import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";

import { aiRoutes } from "./routes/ai";
import { reviewRoutes } from "./routes/reviews";
import { businessRoutes } from "./routes/businesses";
import { webhookRoutes } from "./routes/webhooks";
import { analyticsRoutes } from "./routes/analytics";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.WEB_URL || "http://localhost:3000",
  credentials: true,
}));

// Logging
app.use(morgan("combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Prea multe cereri. Încearcă din nou mai târziu.",
});
app.use("/api", limiter);

// Webhooks need raw body
app.use("/api/webhooks", express.raw({ type: "application/json" }));

// JSON parsing
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});

export default app;
