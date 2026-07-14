"use client";

import { motion } from "framer-motion";
import { Star, Zap, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "new_review",
    title: "Recenzie nouă — 5 stele",
    message: "Maria Ionescu a lăsat o recenzie de 5 stele la Restaurant La Bunica",
    time: "acum 2 minute",
    read: false,
    icon: Star,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    id: "2",
    type: "auto_reply",
    title: "Auto-reply trimis",
    message: "Răspunsul automat a fost publicat pentru recenzia lui Alexandru Popescu",
    time: "acum 15 minute",
    read: false,
    icon: Zap,
    iconColor: "text-brand-400",
    iconBg: "bg-brand-500/10",
  },
  {
    id: "3",
    type: "new_review",
    title: "Recenzie nouă — 2 stele",
    message: "Elena Dumitrescu a lăsat o recenzie negativă la Clinică Zâmbetul. Necesită atenție!",
    time: "acum 1 oră",
    read: false,
    icon: AlertCircle,
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
    urgent: true,
  },
  {
    id: "4",
    type: "reply_published",
    title: "Răspuns publicat pe Google",
    message: "Răspunsul tău a fost publicat cu succes pe Google Business pentru Hotel Panoramic",
    time: "acum 3 ore",
    read: true,
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    id: "5",
    type: "new_review",
    title: "Recenzie nouă — 5 stele",
    message: "Ion Gheorghe a lăsat o recenzie excelentă la Hotel Panoramic",
    time: "ieri, 18:30",
    read: true,
    icon: Star,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
];

export function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notificări</h1>
          <p className="text-muted-foreground mt-1">3 notificări necitite</p>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Marchează toate ca citite
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card
              className={cn(
                "border-border/50 transition-all",
                !notif.read
                  ? "bg-brand-500/5 border-brand-500/20"
                  : "bg-card/50 glass",
                notif.urgent && "border-rose-500/20 bg-rose-500/5"
              )}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={cn("p-2 rounded-lg flex-shrink-0 mt-0.5", notif.iconBg)}>
                  <notif.icon className={cn("w-4 h-4", notif.iconColor)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{notif.title}</p>
                    {!notif.read && (
                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
                    )}
                    {notif.urgent && (
                      <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1.5">
                    {notif.time}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-brand-400 flex-shrink-0"
                >
                  Vizualizează
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
