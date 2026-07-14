"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, ThumbsUp, Brain } from "lucide-react";

const insights = [
  {
    icon: ThumbsUp,
    label: "Cel mai apreciat",
    value: "Mâncarea tradițională",
    color: "text-emerald-400",
    bg: "from-emerald-500/15 to-teal-500/5",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  {
    icon: TrendingDown,
    label: "Cel mai criticat",
    value: "Timpul de așteptare",
    color: "text-rose-400",
    bg: "from-rose-500/15 to-red-500/5",
    border: "border-rose-500/20",
    dot: "bg-rose-400",
  },
  {
    icon: AlertTriangle,
    label: "De îmbunătățit",
    value: "Comunicarea personalului",
    color: "text-amber-400",
    bg: "from-amber-500/15 to-orange-500/5",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  {
    icon: TrendingUp,
    label: "Trend pozitiv",
    value: "Atmosfera restaurantului",
    color: "text-brand-400",
    bg: "from-brand-500/15 to-violet-500/5",
    border: "border-brand-500/20",
    dot: "bg-brand-400",
  },
];

export function AIInsightsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl border border-border/40 bg-card/40 glass p-5 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-glow-sm">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">AI Insights</h3>
            <p className="text-[10px] text-muted-foreground">Analiză automată</p>
          </div>
        </div>
        <span className="text-[10px] font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Live
        </span>
      </div>

      {/* Insights */}
      <div className="space-y-2.5">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r border ${insight.bg} ${insight.border} hover:scale-[1.01] transition-transform duration-200 cursor-default`}
          >
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${insight.dot}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-muted-foreground leading-none mb-0.5">{insight.label}</p>
              <p className={`text-xs font-medium truncate ${insight.color}`}>{insight.value}</p>
            </div>
            <insight.icon className={`w-3.5 h-3.5 flex-shrink-0 ${insight.color} opacity-70`} />
          </motion.div>
        ))}
      </div>

      {/* AI recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-brand-500/10 to-violet-500/5 border border-brand-500/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 shimmer opacity-30" />
        <p className="text-[11px] font-semibold text-brand-400 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Recomandare AI
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Răspunde la recenziile negative în maxim 24h pentru a-ți proteja ratingul.
          <span className="text-rose-400 font-medium"> Ai 3 recenzii urgente.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
