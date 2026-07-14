"use client";

import { motion } from "framer-motion";
import { Star, Sparkles, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const reviews = [
  {
    id: "1",
    author: "Maria Ionescu",
    initials: "MI",
    rating: 5,
    text: "Cel mai bun restaurant din București! Mâncarea a fost delicioasă, personalul foarte amabil.",
    date: "acum 2 ore",
    replied: false,
    sentiment: "positive",
    business: "Restaurant La Bunica",
  },
  {
    id: "2",
    author: "Alexandru Popescu",
    initials: "AP",
    rating: 4,
    text: "Mâncare foarte bună, prețuri ok. Singurul minus a fost că am așteptat puțin mai mult.",
    date: "acum 5 ore",
    replied: true,
    sentiment: "positive",
    business: "Restaurant La Bunica",
  },
  {
    id: "3",
    author: "Elena Dumitrescu",
    initials: "ED",
    rating: 2,
    text: "Am fost dezamăgit. Mâncarea a venit rece și chelnerul nu a fost deloc atent.",
    date: "ieri",
    replied: false,
    sentiment: "negative",
    business: "Clinică Zâmbetul",
  },
  {
    id: "4",
    author: "Ion Gheorghe",
    initials: "IG",
    rating: 5,
    text: "Atmosferă superbă! Am celebrat ziua de naștere a soției și totul a fost perfect.",
    date: "2 zile",
    replied: true,
    sentiment: "positive",
    business: "Hotel Panoramic",
  },
];

const sentimentColors = {
  positive: "text-emerald-400 bg-emerald-500/10",
  neutral: "text-amber-400 bg-amber-500/10",
  negative: "text-rose-400 bg-rose-500/10",
};

export function RecentReviews() {
  return (
    <Card className="border-border/50 bg-card/50 glass">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold">
          Recenzii Recente
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-brand-400 h-8" asChild>
          <Link href="/reviews">
            Toate recenziile
            <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3 p-3 rounded-xl border border-border/30 hover:border-brand-500/20 hover:bg-brand-500/5 transition-all group cursor-pointer"
          >
            {/* Avatar */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-brand-500/30 to-violet-500/30 flex items-center justify-center text-xs font-bold">
              {review.initials}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium">{review.author}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-auto">
                  {review.date}
                </span>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {review.text}
              </p>

              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0 h-5 bg-muted/50"
                >
                  {review.business}
                </Badge>

                {review.replied ? (
                  <Badge className="text-xs px-2 py-0 h-5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                    Răspuns
                  </Badge>
                ) : (
                  <Badge className="text-xs px-2 py-0 h-5 bg-amber-500/10 text-amber-400 border-amber-500/20">
                    <Clock className="w-2.5 h-2.5 mr-1" />
                    Nerăspuns
                  </Badge>
                )}

                {!review.replied && (
                  <Button
                    size="sm"
                    className="ml-auto h-6 text-xs bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link href={`/reviews/${review.id}`}>
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generează AI
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
