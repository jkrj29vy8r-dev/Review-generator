"use client";

import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Building2, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "Generează răspunsuri AI",
    icon: Sparkles,
    href: "/reviews?filter=unanswered",
    gradient: "from-brand-500 to-violet-500",
    glow: "rgba(97,114,243,0.3)",
    description: "17 recenzii așteaptă",
    badge: "17",
    badgeColor: "bg-rose-500",
  },
  {
    label: "Sincronizează Google",
    icon: RefreshCw,
    href: "/businesses",
    gradient: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.3)",
    description: "Ultima sinc. acum 2h",
    badge: null,
  },
  {
    label: "Adaugă afacere",
    icon: Building2,
    href: "/businesses/new",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
    description: "Conectează Google Business",
    badge: null,
  },
  {
    label: "Statistici lunare",
    icon: BarChart3,
    href: "/analytics",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.3)",
    description: "Raport disponibil",
    badge: "NOU",
    badgeColor: "bg-emerald-500",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <Link
            href={action.href}
            className={cn(
              "group relative flex flex-col items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/40 glass transition-all duration-300 overflow-hidden",
              "hover:border-border/70 hover:shadow-card-hover"
            )}
            style={{ "--glow": action.glow } as React.CSSProperties}
          >
            {/* Hover glow bg */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 30% 30%, ${action.glow}25 0%, transparent 70%)` }}
            />

            {/* Icon */}
            <div className="relative">
              {action.badge && (
                <span className={cn("absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center", action.badgeColor)}>
                  {action.badge.length > 2 ? "!" : action.badge}
                </span>
              )}
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.gradient} shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Text */}
            <div className="relative">
              <p className="text-sm font-medium leading-tight mb-0.5">{action.label}</p>
              <p className="text-[11px] text-muted-foreground">{action.description}</p>
            </div>

            {/* Arrow */}
            <ArrowRight className="absolute bottom-3 right-3 w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all duration-300" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
