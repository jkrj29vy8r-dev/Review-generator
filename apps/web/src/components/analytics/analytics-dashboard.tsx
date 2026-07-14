"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Clock,
  MessageSquare,
  TrendingUp,
  Star,
  Sparkles,
  Target,
} from "lucide-react";

const monthlyData = [
  { month: "Ian", recenzii: 18, raspunsuri: 12, rating: 3.8 },
  { month: "Feb", recenzii: 22, raspunsuri: 18, rating: 3.9 },
  { month: "Mar", recenzii: 19, raspunsuri: 17, rating: 4.1 },
  { month: "Apr", recenzii: 28, raspunsuri: 25, rating: 4.0 },
  { month: "Mai", recenzii: 31, raspunsuri: 30, rating: 4.3 },
  { month: "Iun", recenzii: 35, raspunsuri: 34, rating: 4.4 },
  { month: "Iul", recenzii: 29, raspunsuri: 28, rating: 4.5 },
  { month: "Aug", recenzii: 38, raspunsuri: 37, rating: 4.6 },
  { month: "Sep", recenzii: 42, raspunsuri: 40, rating: 4.7 },
  { month: "Oct", recenzii: 36, raspunsuri: 35, rating: 4.6 },
  { month: "Nov", recenzii: 44, raspunsuri: 43, rating: 4.7 },
  { month: "Dec", recenzii: 52, raspunsuri: 51, rating: 4.8 },
];

const topKeywords = [
  { word: "mâncare", count: 89, color: "#6172f3" },
  { word: "personal", count: 67, color: "#8b5cf6" },
  { word: "atmosferă", count: 54, color: "#10b981" },
  { word: "prețuri", count: 43, color: "#f59e0b" },
  { word: "curățenie", count: 38, color: "#f43f5e" },
  { word: "rapiditate", count: 31, color: "#06b6d4" },
];

const sentimentTrend = [
  { month: "Ian", pozitiv: 60, neutru: 25, negativ: 15 },
  { month: "Mar", pozitiv: 65, neutru: 22, negativ: 13 },
  { month: "Mai", pozitiv: 70, neutru: 20, negativ: 10 },
  { month: "Iul", pozitiv: 68, neutru: 21, negativ: 11 },
  { month: "Sep", pozitiv: 72, neutru: 18, negativ: 10 },
  { month: "Nov", pozitiv: 75, neutru: 17, negativ: 8 },
];

const kpiCards = [
  {
    title: "Timp Economisit",
    value: "14h 32m",
    sub: "luna aceasta",
    icon: Clock,
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    change: "+3h față de luna trecută",
    positive: true,
  },
  {
    title: "Recenzii Răspunse",
    value: "267",
    sub: "din 284 total",
    icon: MessageSquare,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    change: "94% rată răspuns",
    positive: true,
  },
  {
    title: "Rating Mediu",
    value: "4.7★",
    sub: "toate locațiile",
    icon: Star,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    change: "+0.9 față de ian.",
    positive: true,
  },
  {
    title: "AI Răspunsuri",
    value: "127",
    sub: "generate luna aceasta",
    icon: Sparkles,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    change: "∞ Pro Plan",
    positive: true,
  },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-border/50 bg-card/50 glass">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <p className="text-xs text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold mt-0.5">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.sub}</p>
                <p className="text-xs text-emerald-500 mt-1">{kpi.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reviews over time */}
        <Card className="border-border/50 bg-card/50 glass">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Recenzii & Răspunsuri</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="reviewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6172f3" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6172f3" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="replyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="recenzii" stroke="#6172f3" fill="url(#reviewGrad)" strokeWidth={2} name="Recenzii" />
                <Area type="monotone" dataKey="raspunsuri" stroke="#10b981" fill="url(#replyGrad)" strokeWidth={2} name="Răspunsuri" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment trend */}
        <Card className="border-border/50 bg-card/50 glass">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Evoluție Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sentimentTrend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="pozitiv" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Pozitiv" />
                <Bar dataKey="neutru" stackId="a" fill="#f59e0b" name="Neutru" />
                <Bar dataKey="negativ" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Negativ" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top keywords */}
      <Card className="border-border/50 bg-card/50 glass">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-400" />
            Top Cuvinte Folosite de Clienți
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topKeywords.map((kw, i) => (
              <motion.div
                key={kw.word}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm w-24 text-muted-foreground">{kw.word}</span>
                <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(kw.count / 89) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: kw.color }}
                  />
                </div>
                <span className="text-sm font-medium w-8 text-right">{kw.count}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
