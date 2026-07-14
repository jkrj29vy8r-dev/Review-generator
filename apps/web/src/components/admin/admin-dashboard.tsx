"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  CreditCard,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  Shield,
  Activity,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const adminStats = [
  { label: "Utilizatori Totali", value: "1,247", icon: Users, change: "+23 săptămâna aceasta", color: "text-brand-400", bg: "bg-brand-500/10" },
  { label: "Afaceri Active", value: "384", icon: Building2, change: "+8 azi", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Venituri Lunare", value: "€4,380", icon: CreditCard, change: "+12% față de luna trecută", color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "AI Tokens Folosiți", value: "4.2M", icon: Sparkles, change: "Luna aceasta", color: "text-violet-400", bg: "bg-violet-500/10" },
];

const recentUsers = [
  { name: "Maria Ionescu", email: "maria@example.ro", plan: "PRO", businesses: 2, joined: "acum 2 ore", status: "active" },
  { name: "Alexandru Popescu", email: "alex@example.ro", plan: "FREE", businesses: 1, joined: "acum 5 ore", status: "active" },
  { name: "Elena Dumitrescu", email: "elena@example.ro", plan: "BUSINESS", businesses: 5, joined: "ieri", status: "active" },
  { name: "Ion Gheorghe", email: "ion@example.ro", plan: "PRO", businesses: 3, joined: "acum 2 zile", status: "inactive" },
];

const planColors: Record<string, string> = {
  FREE: "bg-muted/50 text-muted-foreground",
  PRO: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  BUSINESS: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  ENTERPRISE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-brand-500/10">
          <Shield className="w-5 h-5 text-brand-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Vizualizare completă a platformei</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-border/50 bg-card/50 glass">
              <CardContent className="p-4">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold mt-0.5">{stat.value}</p>
                <p className="text-xs text-emerald-500 mt-0.5">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent users table */}
      <Card className="border-border/50 bg-card/50 glass">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-400" />
            Utilizatori Recenți
          </CardTitle>
          <Button size="sm" variant="outline" className="border-border/50 text-xs h-8">
            Toți utilizatorii
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30">
                <TableHead className="text-xs text-muted-foreground">Utilizator</TableHead>
                <TableHead className="text-xs text-muted-foreground">Plan</TableHead>
                <TableHead className="text-xs text-muted-foreground">Afaceri</TableHead>
                <TableHead className="text-xs text-muted-foreground">Înregistrat</TableHead>
                <TableHead className="text-xs text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs text-muted-foreground">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.email} className="border-border/20 hover:bg-muted/20">
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${planColors[user.plan]}`}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{user.businesses}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{user.joined}</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs ${user.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-muted/50 text-muted-foreground border-0"}`}
                    >
                      {user.status === "active" ? "Activ" : "Inactiv"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Detalii
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System alerts */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-400">Alertă sistem</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              3 utilizatori au depășit limita de 30 răspunsuri AI/lună pe planul Free. Consideră notificarea lor pentru upgrade.
            </p>
          </div>
          <Button size="sm" variant="outline" className="ml-auto flex-shrink-0 h-8 text-xs border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
            Acționează
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
