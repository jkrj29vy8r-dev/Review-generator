import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentReviews } from "@/components/dashboard/recent-reviews";
import { RatingChart } from "@/components/charts/rating-chart";
import { SentimentChart } from "@/components/charts/sentiment-chart";
import { AIInsightsCard } from "@/components/dashboard/ai-insights-card";
import { QuickActions } from "@/components/dashboard/quick-actions";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { userId } = auth();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bun venit! Iată ce se întâmplă cu recenziile tale.
        </p>
      </div>

      {/* Stats grid */}
      <DashboardStats />

      {/* Quick actions */}
      <QuickActions />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RatingChart />
        <SentimentChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentReviews />
        </div>
        <AIInsightsCard />
      </div>
    </div>
  );
}
