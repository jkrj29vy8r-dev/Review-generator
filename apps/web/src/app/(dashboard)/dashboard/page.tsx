"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentReviews } from "@/components/dashboard/recent-reviews";
import { RatingChart } from "@/components/charts/rating-chart";
import { SentimentChart } from "@/components/charts/sentiment-chart";
import { AIInsightsCard } from "@/components/dashboard/ai-insights-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { useI18n } from "@/i18n/context";
import { Sparkles, TrendingUp, Building2, Star, Loader2, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const [businessCount, setBusinessCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => setBusinessCount(d.businessCount ?? 0))
      .catch(() => setBusinessCount(0))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Empty state — no businesses connected
  if (businessCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
      >
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-500/20 to-violet-500/20 border border-brand-500/20 flex items-center justify-center mx-auto">
            <Building2 className="w-12 h-12 text-brand-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">Bun venit la Replai! 👋</h1>
        <p className="text-muted-foreground text-lg mb-2 max-w-md">
          Conectează-ți profilul Google Business pentru a vedea recenziile și a genera răspunsuri AI.
        </p>
        <p className="text-muted-foreground/60 text-sm mb-8 max-w-sm">
          Setup durează mai puțin de 2 minute. Recenziile tale vor apărea automat.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="bg-gradient-to-r from-brand-500 to-violet-500 hover:opacity-90 text-white border-0 px-8 h-12 text-base shadow-lg shadow-brand-500/25"
            asChild
          >
            <Link href="/businesses/new">
              <Globe className="w-5 h-5 mr-2" />
              Conectează Google Business
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-border/50 h-12" asChild>
            <Link href="/businesses">
              <Building2 className="w-5 h-5 mr-2" />
              Adaugă afacere manual
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
          {[
            { icon: "🔄", title: "Sincronizare automată", desc: "Recenziile noi apar instant" },
            { icon: "🤖", title: "Răspunsuri AI", desc: "GPT-4o generează 3 variante" },
            { icon: "🌍", title: "17 limbi", desc: "Detectare automată a limbii" },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-2xl border border-border/40 bg-card/40 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

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
