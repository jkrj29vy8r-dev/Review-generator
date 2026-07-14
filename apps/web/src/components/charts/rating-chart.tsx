"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Ian", rating: 3.8, reviews: 18 },
  { month: "Feb", rating: 3.9, reviews: 22 },
  { month: "Mar", rating: 4.1, reviews: 19 },
  { month: "Apr", rating: 4.0, reviews: 28 },
  { month: "Mai", rating: 4.3, reviews: 31 },
  { month: "Iun", rating: 4.4, reviews: 35 },
  { month: "Iul", rating: 4.5, reviews: 29 },
  { month: "Aug", rating: 4.6, reviews: 38 },
  { month: "Sep", rating: 4.7, reviews: 42 },
  { month: "Oct", rating: 4.6, reviews: 36 },
  { month: "Nov", rating: 4.7, reviews: 44 },
  { month: "Dec", rating: 4.8, reviews: 52 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-bold text-amber-400">
          ★ {payload[0]?.value?.toFixed(1)}
        </p>
        <p className="text-xs text-muted-foreground">
          {payload[1]?.value} recenzii
        </p>
      </div>
    );
  }
  return null;
};

export function RatingChart() {
  return (
    <Card className="border-border/50 bg-card/50 glass">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold">
          Evoluție Rating
        </CardTitle>
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          <TrendingUp className="w-3 h-3 mr-1" />
          +1.0★ an
        </Badge>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6172f3" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6172f3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[3.5, 5]}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="rating"
              stroke="#6172f3"
              strokeWidth={2}
              fill="url(#ratingGradient)"
              dot={{ r: 3, fill: "#6172f3", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6172f3", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
