"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    icon: ThumbsUp,
    label: "Cel mai apreciat",
    value: "Mâncarea tradițională",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: TrendingDown,
    label: "Cel mai criticat",
    value: "Timpul de așteptare",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: AlertTriangle,
    label: "De îmbunătățit",
    value: "Comunicarea personalului",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: TrendingUp,
    label: "Trend pozitiv",
    value: "Atmosfera restaurantului",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
];

export function AIInsightsCard() {
  return (
    <Card className="border-border/50 bg-card/50 glass">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/10">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          AI Insights
          <Badge className="ml-auto bg-brand-500/10 text-brand-400 border-brand-500/20 text-xs">
            Auto
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="flex items-start gap-3 p-3 rounded-xl border border-border/30 hover:border-brand-500/20 transition-colors"
          >
            <div className={`p-2 rounded-lg ${insight.bg} flex-shrink-0`}>
              <insight.icon className={`w-3.5 h-3.5 ${insight.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{insight.label}</p>
              <p className="text-sm font-medium mt-0.5">{insight.value}</p>
            </div>
          </motion.div>
        ))}

        <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-brand-500/10 to-violet-500/10 border border-brand-500/20">
          <p className="text-xs text-brand-400 font-medium mb-1">
            💡 Recomandare AI
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Răspunde la recenziile negative în maxim 24h pentru a-ți proteja
            ratingul. Ai 3 recenzii urgente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
