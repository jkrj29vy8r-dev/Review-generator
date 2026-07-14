"use client";

import { motion } from "framer-motion";
import { Building2, Globe, MapPin, ArrowLeft, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: 1,
    title: "Conectează-ți contul Google",
    description: "Autentifică-te cu contul Google care administrează profilul tău Business.",
    icon: Globe,
    color: "from-sky-500 to-blue-600",
    status: "pending",
  },
  {
    step: 2,
    title: "Selectează locația",
    description: "Alege una sau mai multe locații din Google Business Profile.",
    icon: MapPin,
    color: "from-emerald-500 to-teal-600",
    status: "pending",
  },
  {
    step: 3,
    title: "Sincronizare automată",
    description: "Recenziile tale vor fi importate automat și vei primi răspunsuri AI.",
    icon: CheckCircle2,
    color: "from-brand-500 to-violet-500",
    status: "pending",
  },
];

export default function NewBusinessPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/businesses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Înapoi la afaceri
        </Link>

        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Adaugă o afacere nouă</h1>
          <p className="text-muted-foreground">
            Conectează-ți profilul Google Business pentru a gestiona recenziile cu AI.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-border/40 bg-card/40 glass">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">Pasul {s.step}</span>
                      <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> În curând
                      </span>
                    </div>
                    <p className="font-medium text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-500/20 bg-brand-500/5 p-5 mb-6">
          <p className="text-sm font-medium text-brand-400 mb-1">🚀 Integrarea Google Business este în dezvoltare</p>
          <p className="text-xs text-muted-foreground">
            Momentan lucrăm la integrarea completă cu Google Business Profile API.
            Vei fi notificat imediat ce aceasta devine disponibilă.
          </p>
        </div>

        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/businesses">Anulează</Link>
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-brand-500 to-violet-500 hover:opacity-90"
            disabled
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Conectează Google (în curând)
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
