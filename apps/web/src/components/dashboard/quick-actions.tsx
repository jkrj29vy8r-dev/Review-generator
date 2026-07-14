"use client";

import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Building2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const actions = [
  {
    label: "Generează răspunsuri AI",
    icon: Sparkles,
    href: "/reviews?filter=unanswered",
    gradient: "from-brand-500 to-violet-500",
    description: "17 recenzii așteaptă",
  },
  {
    label: "Sincronizează Google",
    icon: RefreshCw,
    href: "/businesses",
    gradient: "from-sky-500 to-blue-600",
    description: "Ultima sinc. acum 2h",
  },
  {
    label: "Adaugă afacere",
    icon: Building2,
    href: "/businesses/new",
    gradient: "from-emerald-500 to-teal-600",
    description: "Conectează Google Business",
  },
  {
    label: "Vezi statistici",
    icon: BarChart3,
    href: "/analytics",
    gradient: "from-amber-500 to-orange-500",
    description: "Raport lunar disponibil",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action, i) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.05 }}
        >
          <Button
            variant="outline"
            className="w-full h-auto py-4 px-4 flex flex-col items-start gap-2 border-border/50 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all card-hover"
            asChild
          >
            <Link href={action.href}>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient}`}
              >
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
