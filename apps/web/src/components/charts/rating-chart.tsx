"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
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
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/90 border border-border/60 rounded-xl px-3 py-2.5 shadow-xl glass">
      <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-bold text-amber-400">★ {payload[0]?.value?.toFixed(1)}</p>
      <p className="text-[11px] text-muted-foreground">{payload[1]?.value} recenzii</p>
    </div>
  );
};

export function RatingChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="rounded-2xl border border-border/40 bg-card/40 glass p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold">Evoluție Rating</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Ultimele 12 luni</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5" />
          +1.0★ an
        </div>
      </div>

      <ResponsiveContainer width="100%" height={188}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
          <defs>
            <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6172f3" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="reviewsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis domain={[3.5, 5]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(97,114,243,0.3)", strokeWidth: 1, strokeDasharray: "4 2" }} />
          <Area type="monotone" dataKey="rating" stroke="#6172f3" strokeWidth={2.5} fill="url(#ratingGrad)"
            dot={{ r: 0 }} activeDot={{ r: 5, fill: "#6172f3", stroke: "#fff", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Bottom stat */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
        <div className="text-[11px] text-muted-foreground">Rating actual</div>
        <div className="text-base font-bold text-amber-400">4.8 ★</div>
      </div>
    </motion.div>
  );
}
