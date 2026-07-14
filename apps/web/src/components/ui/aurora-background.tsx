"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function AuroraBackground({ className, intensity = "medium" }: AuroraBackgroundProps) {
  const opacityMap = { low: "opacity-20", medium: "opacity-30", high: "opacity-50" };
  const darkOpacityMap = { low: "dark:opacity-10", medium: "dark:opacity-15", high: "dark:opacity-25" };

  return (
    <div className={cn("aurora-bg", className)} aria-hidden="true">
      <div className={cn("aurora-blob aurora-blob-1", opacityMap[intensity], darkOpacityMap[intensity])} />
      <div className={cn("aurora-blob aurora-blob-2", opacityMap[intensity], darkOpacityMap[intensity])} />
      <div className={cn("aurora-blob aurora-blob-3", opacityMap[intensity], darkOpacityMap[intensity])} />
      <div className={cn("aurora-blob aurora-blob-4", opacityMap[intensity], darkOpacityMap[intensity])} />
      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
