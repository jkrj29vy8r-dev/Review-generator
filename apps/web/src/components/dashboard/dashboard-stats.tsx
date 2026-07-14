"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Star,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Recenzii",
    value: "284",
    change: "+12 azi",
    changeType: "positive",
    icon: MessageSquare,
    color: "from-brand-500 to-brand-600",
    bg: "bg-brand-500/10",
    iconColor: "text-brand-400",
  },
  {
    title: "Rating Mediu",
    value: "4.7",
    suffix: "★",
    change: "+0.2 față de luna trecută",
    changeType: "positive",
    icon: Star,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    title: "Răspunse",
    value: "267",
    change: "94% rată răspuns",
    changeType: "positive",
    icon: CheckCircle2,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    title: "Nerăspunse",
    value: "17",
    change: "Necesită atenție",
    changeType: "negative",
    icon: AlertCircle,
    color: "from-rose-500 to-red-500",
    bg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  {
    title: "Timp Economisit",
    value: "14h",
    change: "luna aceasta",
    changeType: "positive",
    icon: Clock,
    color: "from-sky-500 to-blue-500",
    bg: "bg-sky-500/10",
    iconColor: "text-sky-400",
  },
  {
    title: "Recenzii Noi",
    value: "31",
    change: "în ultimele 7 zile",
    changeType: "positive",
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card className="border-border/50 bg-card/50 glass card-hover overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("w-4 h-4", stat.iconColor)} />
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-amber-400">{stat.suffix}</span>
                  )}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    stat.changeType === "positive"
                      ? "text-emerald-500"
                      : "text-rose-500"
                  )}
                >
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
