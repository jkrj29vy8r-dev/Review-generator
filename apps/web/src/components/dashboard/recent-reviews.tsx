"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Clock, ExternalLink, Loader2, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useI18n } from "@/i18n/context";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  reviewDate: string;
  isReplied: boolean;
  business: { name: string };
}

function getSentiment(rating: number) {
  if (rating >= 4) return "positive";
  if (rating <= 2) return "negative";
  return "neutral";
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)}h`;
  if (diff < 172800) return "ieri";
  return `${Math.floor(diff / 86400)}z`;
}

export function RecentReviews() {
  const { t } = useI18n();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews?limit=5")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d?.reviews)) setReviews(d.reviews.slice(0, 5)); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="border-border/40 bg-card/40 glass h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
        <CardTitle className="text-sm font-semibold">Recenzii Recente</CardTitle>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1" asChild>
          <Link href="/reviews">
            Vezi toate
            <ExternalLink className="w-3 h-3" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Nicio recenzie încă</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Conectează Google Business și sincronizează</p>
            <Button size="sm" className="mt-3 bg-brand-500 hover:bg-brand-600 text-white border-0 text-xs" asChild>
              <Link href="/businesses">Conectează acum</Link>
            </Button>
          </div>
        ) : (
          reviews.map((review, i) => {
            const initials = review.authorName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 p-3 rounded-xl bg-muted/20 border border-border/20 hover:border-brand-500/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500/30 to-violet-500/30 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span className="text-xs font-medium truncate">{review.authorName}</span>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={cn("w-2.5 h-2.5", j < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20")} />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">{formatDate(review.reviewDate)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {review.business?.name && (
                      <span className="text-[10px] text-muted-foreground/60 truncate">{review.business.name}</span>
                    )}
                    <div className="ml-auto flex-shrink-0">
                      {review.isReplied ? (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px] px-1.5 py-0 h-4">
                          <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                          Răspuns
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-500/10 text-amber-400 border-0 text-[10px] px-1.5 py-0 h-4">
                          <Clock className="w-2.5 h-2.5 mr-0.5" />
                          Nerăspuns
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
