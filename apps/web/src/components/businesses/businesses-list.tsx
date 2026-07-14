"use client";

import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  TrendingUp,
  Settings,
  RefreshCw,
  Plus,
  Globe,
  MapPin,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Link from "next/link";

const businesses = [
  {
    id: "1",
    name: "Restaurant La Bunica",
    type: "Restaurant",
    city: "București",
    address: "Str. Florilor 12, Sector 1",
    rating: 4.7,
    totalReviews: 284,
    unanswered: 17,
    connected: true,
    autoReply: true,
    color: "from-amber-400 to-orange-500",
    emoji: "🍽️",
  },
  {
    id: "2",
    name: "Hotel Panoramic",
    type: "Hotel",
    city: "Sinaia",
    address: "Calea Prahovei 45",
    rating: 4.5,
    totalReviews: 128,
    unanswered: 3,
    connected: true,
    autoReply: false,
    color: "from-sky-400 to-blue-500",
    emoji: "🏨",
  },
  {
    id: "3",
    name: "Clinică Zâmbetul",
    type: "Clinică Dentară",
    city: "Cluj-Napoca",
    address: "Bd. Eroilor 22",
    rating: 4.9,
    totalReviews: 96,
    unanswered: 0,
    connected: false,
    autoReply: false,
    color: "from-emerald-400 to-teal-500",
    emoji: "🦷",
  },
];

export function BusinessesList() {
  return (
    <div className="space-y-4">
      {/* Add business button */}
      <div className="flex justify-end">
        <Button className="bg-brand-500 hover:bg-brand-600 text-white border-0" asChild>
          <Link href="/businesses/new">
            <Plus className="w-4 h-4 mr-2" />
            Adaugă afacere
          </Link>
        </Button>
      </div>

      {/* Business cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {businesses.map((biz, i) => (
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
                        biz.color
                      )}
                    >
                      {biz.emoji}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{biz.name}</h3>
                      <p className="text-xs text-muted-foreground">{biz.type}</p>
                    </div>
                  </div>

                  {biz.connected ? (
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
                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {biz.address}, {biz.city}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-center gap-0.5 mb-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-amber-400">{biz.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className="text-sm font-bold">{biz.totalReviews}</p>
                    <p className="text-xs text-muted-foreground">Recenzii</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/30">
                    <p className={cn("text-sm font-bold", biz.unanswered > 0 ? "text-rose-400" : "text-emerald-400")}>
                      {biz.unanswered}
                    </p>
                    <p className="text-xs text-muted-foreground">Nerăspuns</p>
                  </div>
                </div>

                {/* Auto reply toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-medium">Auto Reply 5★</span>
                  </div>
                  <Switch
                    checked={biz.autoReply}
                    className="data-[state=checked]:bg-brand-500"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {biz.connected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs border-border/50"
                    >
                      <RefreshCw className="w-3 h-3 mr-1.5" />
                      Sincronizează
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs bg-brand-500 hover:bg-brand-600 text-white border-0"
                    >
                      <Globe className="w-3 h-3 mr-1.5" />
                      Conectează Google
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-border/50"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add new business card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: businesses.length * 0.08 }}
        >
          <Card
            className="border-border/50 border-dashed bg-card/20 glass card-hover cursor-pointer h-full min-h-[280px] flex items-center justify-center"
            asChild
          >
            <Link href="/businesses/new">
              <CardContent className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center mx-auto mb-4 group-hover:border-brand-500/30 transition-colors">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-sm mb-1">Adaugă afacere</p>
                <p className="text-xs text-muted-foreground">
                  Conectează un nou profil Google Business
                </p>
              </CardContent>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
