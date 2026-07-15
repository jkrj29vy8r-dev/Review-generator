"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReviewCard } from "./review-card";
import { AIReplyDialog } from "@/components/ai/ai-reply-dialog";

interface ApiReview {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  reviewDate: string;
  isReplied: boolean;
  business: { name: string; type: string; city: string };
  replies: { text: string }[];
}

interface NormalizedReview {
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

function getSentiment(rating: number): "positive" | "neutral" | "negative" {
  if (rating >= 4) return "positive";
  if (rating <= 2) return "negative";
  return "neutral";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} minute`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`;
  if (diff < 172800) return "ieri";
  return `${Math.floor(diff / 86400)} zile în urmă`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function normalizeReview(r: ApiReview): NormalizedReview {
  return {
    id: r.id,
    author: r.authorName,
    initials: getInitials(r.authorName),
    rating: r.rating,
    text: r.text,
    date: formatDate(r.reviewDate),
    replied: r.isReplied,
    replyText: r.replies?.[0]?.text,
    sentiment: getSentiment(r.rating),
    business: r.business?.name ?? "",
    businessType: r.business?.type ?? "",
    city: r.business?.city ?? "",
  };
}

interface ReviewsListProps {
  filter?: string;
  search?: string;
}

export function ReviewsList({ filter = "all", search = "" }: ReviewsListProps) {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<NormalizedReview | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ filter, search });
    fetch(`/api/reviews?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.reviews)) {
          setReviews(data.reviews.map(normalizeReview));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter, search]);

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Refresh list to pick up newly published replies
      const params = new URLSearchParams({ filter, search });
      fetch(`/api/reviews?${params}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data?.reviews)) {
            setReviews(data.reviews.map(normalizeReview));
          }
        })
        .catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-sm">Nu există recenzii{filter !== "all" ? " pentru acest filtru" : ""}.</p>
        {filter === "all" && (
          <p className="text-xs mt-1">Conectează un cont Google Business și sincronizează recenziile.</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <AnimatePresence>
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ReviewCard
                review={review}
                onGenerateReply={() => {
                  setSelectedReview(review);
                  setDialogOpen(true);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedReview && (
        <AIReplyDialog
          open={dialogOpen}
          onOpenChange={handleDialogClose}
          review={selectedReview}
        />
      )}
    </>
  );
}
