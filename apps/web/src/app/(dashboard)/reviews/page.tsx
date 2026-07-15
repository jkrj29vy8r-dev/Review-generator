import { Metadata } from "next";
import { ReviewsContainer } from "@/components/reviews/reviews-container";

export const metadata: Metadata = { title: "Recenzii" };

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recenzii</h1>
          <p className="text-muted-foreground mt-1">
            Gestionează și răspunde la toate recenziile tale Google
          </p>
        </div>
      </div>
      <ReviewsContainer />
    </div>
  );
}
