"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Building2,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  replied: boolean;
  replyText?: string;
  sentiment: "positive" | "neutral" | "negative";
  business: string;
  businessType: string;
  city: string;
}

interface ReviewCardProps {
  review: Review;
  onGenerateReply: () => void;
}

const sentimentConfig = {
  positive: { icon: ThumbsUp, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Pozitiv" },
  neutral: { icon: Minus, color: "text-amber-400", bg: "bg-amber-500/10", label: "Neutru" },
  negative: { icon: ThumbsDown, color: "text-rose-400", bg: "bg-rose-500/10", label: "Negativ" },
};

const ratingColors = {
  5: "text-emerald-400",
  4: "text-brand-400",
  3: "text-amber-400",
  2: "text-orange-400",
  1: "text-rose-400",
};

export function ReviewCard({ review, onGenerateReply }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const sentiment = sentimentConfig[review.sentiment];
  const ratingColor = ratingColors[review.rating as keyof typeof ratingColors] || "text-muted-foreground";

  return (
    <Card
      className={cn(
        "border-border/50 bg-card/50 glass transition-all duration-200 hover:border-brand-500/20",
        review.rating <= 2 && "border-rose-500/20 hover:border-rose-500/30"
      )}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/30 to-violet-500/30 flex items-center justify-center text-sm font-bold">
            {review.initials}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-semibold text-sm">{review.author}</span>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < review.rating
                        ? `fill-current ${ratingColor}`
                        : "text-muted/30"
                    )}
                  />
                ))}
              </div>

              {/* Sentiment badge */}
              <Badge
                variant="secondary"
                className={cn("text-xs px-2 py-0 h-5", sentiment.bg, sentiment.color, "border-0")}
              >
                <sentiment.icon className="w-2.5 h-2.5 mr-1" />
                {sentiment.label}
              </Badge>

              <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
            </div>

            {/* Review text */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {review.text}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs bg-muted/50 border-0">
                <Building2 className="w-2.5 h-2.5 mr-1" />
                {review.business}
              </Badge>
              <span className="text-xs text-muted-foreground">{review.city}</span>
            </div>

            {/* Reply section */}
            {review.replied && review.replyText && (
              <div className="mb-3">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Răspuns publicat
                  {expanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-muted-foreground leading-relaxed"
                  >
                    {review.replyText}
                  </motion.div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!review.replied ? (
                <>
                  <Button
                    size="sm"
                    onClick={onGenerateReply}
                    className="h-8 text-xs bg-brand-500 hover:bg-brand-600 text-white border-0 shadow-sm shadow-brand-500/25"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Generează răspuns AI
                  </Button>
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
                    <Clock className="w-2.5 h-2.5 mr-1" />
                    Nerăspuns
                  </Badge>
                </>
              ) : (
                <>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                    <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                    Răspuns publicat
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onGenerateReply}
                    className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Rescrie cu AI
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
