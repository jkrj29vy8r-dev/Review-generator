"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  RefreshCw,
  Plus,
  Globe,
  MapPin,
  Zap,
  Settings,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  rating: number;
  totalReviews: number;
  unanswered: number;
  connected: boolean;
}

const EMOJI_MAP: Record<string, string> = {
  Restaurant: "🍽️",
  Hotel: "🏨",
  Cafe: "☕",
  Bar: "🍺",
  Spa: "💆",
  Salon: "💇",
  Clinic: "🏥",
  Gym: "🏋️",
  Shop: "🛍️",
};

const COLOR_MAP = [
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-purple-400 to-violet-500",
  "from-rose-400 to-pink-500",
];

export function BusinessesList() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/businesses")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.businesses)) setBusinesses(data.businesses);
        else if (Array.isArray(data)) setBusinesses(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSync = async (businessId: string) => {
    setSyncing(businessId);
    try {
      const res = await fetch("/api/google/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId }),
      });
      const data = await res.json();
      if (res.ok) {
        // Refresh businesses list
        const updated = await fetch("/api/businesses").then((r) => r.json());
        if (Array.isArray(updated?.businesses)) setBusinesses(updated.businesses);
        else if (Array.isArray(updated)) setBusinesses(updated);
        alert(`Sincronizat: ${data.synced} recenzii noi`);
      } else {
        alert(data.error || "Eroare la sincronizare");
      }
    } catch {
      alert("Eroare la sincronizare");
    } finally {
      setSyncing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="bg-brand-500 hover:bg-brand-600 text-white border-0" asChild>
          <Link href="/businesses/new">
            <Plus className="w-4 h-4 mr-2" />
            Adaugă afacere
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {businesses.map((biz, i) => {
          const isConnected = biz.connected;
          const emoji = EMOJI_MAP[biz.type] ?? "🏪";
          const color = COLOR_MAP[i % COLOR_MAP.length];

          return (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-border/50 bg-card/50 glass card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl",
                          color
                        )}
                      >
                        {emoji}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{biz.name}</h3>
                        <p className="text-xs text-muted-foreground">{biz.type}</p>
                      </div>
                    </div>

                    {isConnected ? (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                        <Globe className="w-2.5 h-2.5 mr-1" />
                        Conectat
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                        Neconectat
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {biz.city && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {biz.address ? `${biz.address}, ` : ""}{biz.city}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-center gap-0.5 mb-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-amber-400">
                          {biz.rating?.toFixed(1) ?? "–"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <p className="text-sm font-bold">{biz.totalReviews ?? 0}</p>
                      <p className="text-xs text-muted-foreground">Recenzii</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <p
                        className={cn(
                          "text-sm font-bold",
                          (biz.unanswered ?? 0) > 0 ? "text-rose-400" : "text-emerald-400"
                        )}
                      >
                        {biz.unanswered ?? 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Nerăspuns</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-muted/20">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-medium">Auto Reply 5★</span>
                    </div>
                    <Switch className="data-[state=checked]:bg-brand-500" />
                  </div>

                  <div className="flex gap-2">
                    {isConnected ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-xs border-border/50"
                        onClick={() => handleSync(biz.id)}
                        disabled={syncing === biz.id}
                      >
                        {syncing === biz.id ? (
                          <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                        ) : (
                          <RefreshCw className="w-3 h-3 mr-1.5" />
                        )}
                        Sincronizează
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-brand-500 hover:bg-brand-600 text-white border-0"
                        asChild
                      >
                        <a href={`/api/google/connect?businessId=${biz.id}`}>
                          <Globe className="w-3 h-3 mr-1.5" />
                          Conectează Google
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border/50"
                      asChild
                    >
                      <Link href={`/businesses/${biz.id}/settings`}>
                        <Settings className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: businesses.length * 0.08 }}
        >
          <Link href="/businesses/new">
            <Card className="border-border/50 border-dashed bg-card/20 glass card-hover cursor-pointer h-full min-h-[280px] flex items-center justify-center">
              <CardContent className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-sm mb-1">Adaugă afacere</p>
                <p className="text-xs text-muted-foreground">
                  Conectează un nou profil Google Business
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
