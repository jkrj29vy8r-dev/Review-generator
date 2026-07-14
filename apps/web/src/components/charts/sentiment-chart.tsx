"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Pozitiv", value: 68, color: "#10b981" },
  { name: "Neutru", value: 20, color: "#f59e0b" },
  { name: "Negativ", value: 12, color: "#f43f5e" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-3 shadow-xl">
        <p className="text-sm font-medium" style={{ color: payload[0].payload.color }}>
          {payload[0].name}: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function SentimentChart() {
  return (
    <Card className="border-border/50 bg-card/50 glass">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Analiză Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="60%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex-1 space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                Bazat pe 284 recenzii
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
