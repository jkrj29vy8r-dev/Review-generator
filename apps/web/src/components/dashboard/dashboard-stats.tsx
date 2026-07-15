"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, AlertCircle, Building2 } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import type { TranslationKey } from "@/i18n/translations";

interface DashboardData {
  totalReviews: number;
  unanswered: number;
  avgRating: number;
  businessCount: number;
}

interface StatConfig {
  key: keyof DashboardData;
  titleKey: TranslationKey;
  changeKey: TranslationKey;
  suffix: string;
  decimals?: number;
  icon: React.ElementType;
  gradient: string;
  glow: string;
  bg: string;
  iconColor: string;
  border: string;
  changeType: "positive" | "negative";
}

const statConfigs: StatConfig[] = [
  {
    key: "totalReviews",
    titleKey: "dashboard.totalReviews",
    changeKey: "dashboard.totalReviewsChange",
    suffix: "",
    icon: MessageSquare,
    gradient: "from-brand-500 to-brand-600",
    glow: "rgba(97,114,243,0.4)",
    bg: "from-brand-500/15 to-brand-600/5",
    iconColor: "text-brand-400",
    border: "border-brand-500/20",
    changeType: "positive",
  },
  {
    key: "avgRating",
    titleKey: "dashboard.avgRating",
    changeKey: "dashboard.avgRatingChange",
    suffix: "★",
    decimals: 1,
    icon: Star,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.4)",
    bg: "from-amber-500/15 to-orange-500/5",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
    changeType: "positive",
  },
  {
    key: "unanswered",
    titleKey: "dashboard.unanswered",
    changeKey: "dashboard.unansweredChange",
    suffix: "",
    icon: AlertCircle,
    gradient: "from-rose-500 to-red-500",
    glow: "rgba(244,63,94,0.4)",
    bg: "from-rose-500/15 to-red-500/5",
    iconColor: "text-rose-400",
    border: "border-rose-500/20",
    changeType: "negative",
  },
  {
    key: "businessCount",
    titleKey: "businesses.title",
    changeKey: "businesses.connectedChange",
    suffix: "",
    icon: Building2,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.4)",
    bg: "from-emerald-500/15 to-teal-500/5",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
    changeType: "positive",
  },
];

export function DashboardStats() {
  const { t } = useI18n();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .catch(() => {});
  }, []);

  const getValue = (key: keyof DashboardData) => data?.[key] ?? 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {statConfigs.map((stat, i) => (
        <motion.div
          key={stat.titleKey}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.07, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="h-full"
        >
          <TiltCard glowColor={stat.glow} tiltAmount={6} className="h-full">
            <div
              className={cn(
                "relative h-full p-4 rounded-xl border bg-gradient-to-br overflow-hidden transition-all duration-300",
                stat.bg,
                stat.border
              )}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 shimmer" />
              </div>

              <div className="relative mb-3">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-sm`}>
                  <stat.icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-[11px] text-muted-foreground font-medium leading-tight">{t(stat.titleKey)}</p>
                <p className="text-2xl font-bold tabular-nums tracking-tight flex items-baseline gap-0.5">
                  <AnimatedCounter
                    value={getValue(stat.key) as number}
                    decimals={stat.decimals ?? 0}
                    duration={1500}
                    className={stat.suffix === "★" ? "text-amber-400" : ""}
                  />
                  {stat.suffix && (
                    <span className={cn("text-base", stat.suffix === "★" ? "text-amber-400" : stat.iconColor)}>
                      {stat.suffix}
                    </span>
                  )}
                </p>
                <p className={cn("text-[11px] leading-tight", stat.changeType === "positive" ? "text-emerald-500" : "text-rose-400")}>
                  {t(stat.changeKey)}
                </p>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-40`} />
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
