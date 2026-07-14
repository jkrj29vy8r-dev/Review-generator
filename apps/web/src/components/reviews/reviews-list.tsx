"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewCard } from "./review-card";
import { AIReplyDialog } from "@/components/ai/ai-reply-dialog";

const mockReviews = [
  {
    id: "1",
    author: "Maria Ionescu",
    initials: "MI",
    rating: 5,
    text: "Cel mai bun restaurant din București! Mâncarea a fost delicioasă, personalul foarte amabil. Cu siguranță revin!",
    date: "acum 2 ore",
    replied: false,
    sentiment: "positive" as const,
    business: "Restaurant La Bunica",
    businessType: "restaurant",
    city: "București",
  },
  {
    id: "2",
    author: "Alexandru Popescu",
    initials: "AP",
    rating: 4,
    text: "Mâncare foarte bună, prețuri ok. Singurul minus a fost că am așteptat puțin mai mult pentru comandă. Altfel, totul perfect.",
    date: "acum 5 ore",
    replied: true,
    replyText: "Bună ziua, Alexandru! Vă mulțumim pentru feedback sincer. Apreciem că v-ați bucurat de mâncare și ne pare rău pentru așteptare. Lucrăm la îmbunătățirea timpilor de servire.",
    sentiment: "positive" as const,
    business: "Restaurant La Bunica",
    businessType: "restaurant",
    city: "București",
  },
  {
    id: "3",
    author: "Elena Dumitrescu",
    initials: "ED",
    rating: 2,
    text: "Am fost dezamăgit. Mâncarea a venit rece și chelnerul nu a fost deloc atent. Sper să se îmbunătățească.",
    date: "ieri",
    replied: false,
    sentiment: "negative" as const,
    business: "Clinică Zâmbetul",
    businessType: "clinica",
    city: "Cluj",
  },
  {
    id: "4",
    author: "Ion Gheorghe",
    initials: "IG",
    rating: 5,
    text: "Atmosferă superbă! Am celebrat ziua de naștere a soției și totul a fost perfect. Recomand cu căldură!",
    date: "2 zile în urmă",
    replied: true,
    replyText: "Bună ziua, Ion! Ne bucurăm enorm că ați ales restaurantul nostru pentru o ocazie atât de specială. Sper că ziua de naștere a soției a fost memorabilă!",
    sentiment: "positive" as const,
    business: "Hotel Panoramic",
    businessType: "hotel",
    city: "Sinaia",
  },
  {
    id: "5",
    author: "Andreea Stancu",
    initials: "AS",
    rating: 3,
    text: "Mâncare ok, dar nu am fost impresionată. Prețurile sunt puțin mari față de calitate. Poate mai vizitez.",
    date: "3 zile în urmă",
    replied: false,
    sentiment: "neutral" as const,
    business: "Restaurant La Bunica",
    businessType: "restaurant",
    city: "București",
  },
];

export function ReviewsList() {
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGenerateReply = (review: typeof mockReviews[0]) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-3">
        <AnimatePresence>
          {mockReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <ReviewCard
                review={review}
                onGenerateReply={() => handleGenerateReply(review)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedReview && (
        <AIReplyDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          review={selectedReview}
        />
      )}
    </>
  );
}
