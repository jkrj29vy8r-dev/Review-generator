import { Metadata } from "next";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";

export const metadata: Metadata = { title: "Statistici" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Statistici & Analiză</h1>
        <p className="text-muted-foreground mt-1">
          Performanța recenziilor tale în timp real
        </p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
