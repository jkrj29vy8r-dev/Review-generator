"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Pozitiv", value: 68, color: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { name: "Neutru", value: 20, color: "#f59e0b", glow: "rgba(245,158,11,0.4)" },
  { name: "Negativ", value: 12, color: "#f43f5e", glow: "rgba(244,63,94,0.4)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/90 border border-border/60 rounded-xl px-3 py-2 shadow-xl glass">
      <p className="text-sm font-semibold" style={{ color: payload[0].payload.color }}>
        {payload[0].name}: {payload[0].value}%
      </p>
    </div>
  );
};

export function SentimentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="rounded-2xl border border-border/40 bg-card/40 glass p-5"
    >
      <div className="mb-5">
        <h3 className="text-sm font-semibold">Analiză Sentiment</h3>
        <p className="text-[11px] text-muted-foreground mt-0.5">Bazat pe 284 recenzii</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-emerald-400">68%</span>
            <span className="text-[10px] text-muted-foreground">pozitiv</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.glow}` }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}%</span>
              </div>
              <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          ))}

          <div className="pt-2 border-t border-border/30">
            <p className="text-[11px] text-muted-foreground">↑ +5% față de luna trecută</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
