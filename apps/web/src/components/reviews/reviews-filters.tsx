"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const filters = [
  { label: "Toate", value: "all" },
  { label: "Nerăspunse", value: "unanswered", urgent: true },
  { label: "Răspunse", value: "answered" },
  { label: "5 stele", value: "5" },
  { label: "4 stele", value: "4" },
  { label: "3 stele", value: "3" },
  { label: "1-2 stele", value: "1-2", urgent: true },
];

export function ReviewsFilters() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Caută în recenzii după autor, text..."
          className="pl-9 bg-card/50 border-border/50"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant="ghost"
            size="sm"
            onClick={() => setActive(f.value)}
            className={cn(
              "h-8 px-3 rounded-full text-sm transition-all",
              active === f.value
                ? "bg-brand-500 text-white hover:bg-brand-600"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {f.label}
            {f.urgent && (
              <span className="ml-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full inline-block" />
            )}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 ml-auto text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
          Filtre avansate
        </Button>
      </div>
    </div>
  );
}
