"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star, CheckCircle2, AlertCircle, TrendingUp, Clock } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Recenzii",
    value: 284,
    suffix: "",
    change: "+12 azi",
    changeType: "positive" as const,
    icon: MessageSquare,
    gradient: "from-brand-500 to-brand-600",
    glow: "rgba(97,114,243,0.4)",
    bg: "from-brand-500/15 to-brand-600/5",
    iconColor: "text-brand-400",
    border: "border-brand-500/20",
  },
  {
    title: "Rating Mediu",
    value: 4.7,
    suffix: "★",
    decimals: 1,
    change: "+0.2 față de luna trecută",
    changeType: "positive" as const,
    icon: Star,
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.4)",
    bg: "from-amber-500/15 to-orange-500/5",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    title: "Răspunse",
    value: 267,
    suffix: "",
    change: "94% rată răspuns",
    changeType: "positive" as const,
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.4)",
    bg: "from-emerald-500/15 to-teal-500/5",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    title: "Nerăspunse",
    value: 17,
    suffix: "",
    change: "Necesită atenție",
    changeType: "negative" as const,
    icon: AlertCircle,
    gradient: "from-rose-500 to-red-500",
    glow: "rgba(244,63,94,0.4)",
    bg: "from-rose-500/15 to-red-500/5",
    iconColor: "text-rose-400",
    border: "border-rose-500/20",
  },
  {
    title: "Timp Economisit",
    value: 14,
    suffix: "h",
    change: "luna aceasta",
    changeType: "positive" as const,
    icon: Clock,
    gradient: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.4)",
    bg: "from-sky-500/15 to-blue-500/5",
    iconColor: "text-sky-400",
    border: "border-sky-500/20",
  },
  {
    title: "Recenzii Noi",
    value: 31,
    suffix: "",
    change: "în ultimele 7 zile",
    changeType: "positive" as const,
    icon: TrendingUp,
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.4)",
    bg: "from-violet-500/15 to-purple-600/5",
    iconColor: "text-violet-400",
    border: "border-violet-500/20",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
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
              {/* Background shimmer */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 shimmer" />
              </div>

              {/* Icon */}
              <div className="relative mb-3">
                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-sm`}>
                  <stat.icon className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Value */}
              <div className="space-y-0.5">
                <p className="text-[11px] text-muted-foreground font-medium leading-tight">{stat.title}</p>
                <p className="text-2xl font-bold tabular-nums tracking-tight flex items-baseline gap-0.5">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={"decimals" in stat ? stat.decimals ?? 0 : 0}
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
                  {stat.change}
                </p>
              </div>

              {/* Bottom glow line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-40`} />
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
