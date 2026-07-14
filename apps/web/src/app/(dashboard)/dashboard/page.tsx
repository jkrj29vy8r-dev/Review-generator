"use client";

import { motion } from "framer-motion";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentReviews } from "@/components/dashboard/recent-reviews";
import { RatingChart } from "@/components/charts/rating-chart";
import { SentimentChart } from "@/components/charts/sentiment-chart";
import { AIInsightsCard } from "@/components/dashboard/ai-insights-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { useI18n } from "@/i18n/context";
import { Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse inline-block" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{t("dashboard.subtitle")}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-card/60 glass border border-border/40 px-3 py-2 rounded-xl">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Rating +0.3 luna aceasta</span>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={itemVariants}>
        <DashboardStats />
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>

      {/* Charts row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RatingChart />
        <SentimentChart />
      </motion.div>

      {/* Bottom row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentReviews />
        </div>
        <AIInsightsCard />
      </motion.div>
    </motion.div>
  );
}
