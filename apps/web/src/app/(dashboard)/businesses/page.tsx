import { Metadata } from "next";
import { BusinessesList } from "@/components/businesses/businesses-list";

export const metadata: Metadata = { title: "Afaceri" };

export default function BusinessesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Afacerile Mele</h1>
        <p className="text-muted-foreground mt-1">
          Gestionează toate locațiile și profilurile Google Business
        </p>
      </div>
      <BusinessesList />
    </div>
  );
}
