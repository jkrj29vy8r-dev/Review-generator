"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Zap,
  CreditCard,
  User,
  Shield,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    current: false,
    features: ["30 răspunsuri AI/lună", "1 locație", "Suport email"],
  },
  {
    name: "Pro",
    price: "49",
    current: true,
    popular: true,
    features: ["AI nelimitat", "Auto Reply", "AI Insights", "3 locații"],
  },
  {
    name: "Business",
    price: "149",
    current: false,
    features: ["Tot din Pro", "Locații nelimitate", "API", "Echipă"],
  },
];

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    push: false,
    newReview: true,
    autoReply: true,
  });

  const [autoReply, setAutoReply] = useState({
    fiveStars: true,
    fourFiveStars: false,
    manualApproval: false,
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Setări</h1>
        <p className="text-muted-foreground mt-1">Configurează platforma după preferințele tale</p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="bg-muted/50 border border-border/50">
          <TabsTrigger value="account">
            <User className="w-3.5 h-3.5 mr-1.5" />
            Cont
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-3.5 h-3.5 mr-1.5" />
            Notificări
          </TabsTrigger>
          <TabsTrigger value="auto-reply">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Auto Reply
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="w-3.5 h-3.5 mr-1.5" />
            Abonament
          </TabsTrigger>
        </TabsList>

        {/* Account */}
        <TabsContent value="account" className="space-y-4 mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Informații Cont</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prenume</Label>
                  <Input placeholder="Ioan" className="border-border/50 bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Nume</Label>
                  <Input placeholder="Popescu" className="border-border/50 bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemplu.ro" className="border-border/50 bg-background/50" />
              </div>
              <Button className="bg-brand-500 hover:bg-brand-600 text-white border-0">
                Salvează modificările
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Canale Notificări</CardTitle>
              <CardDescription>Alege cum primești alertele</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "email", label: "Email", desc: "Notificări pe email" },
                { key: "browser", label: "Browser", desc: "Notificări push în browser" },
                { key: "push", label: "Mobile Push", desc: "Notificări pe telefon" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(v) => setNotifications(p => ({ ...p, [item.key]: v }))}
                    className="data-[state=checked]:bg-brand-500"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Evenimente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "newReview", label: "Recenzie nouă", desc: "Când apare o recenzie nouă" },
                { key: "autoReply", label: "Auto-reply trimis", desc: "La fiecare răspuns automat" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(v) => setNotifications(p => ({ ...p, [item.key]: v }))}
                    className="data-[state=checked]:bg-brand-500"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto Reply */}
        <TabsContent value="auto-reply" className="space-y-4 mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Configurare Auto Reply
              </CardTitle>
              <CardDescription>
                Activează răspunsul automat AI pentru recenzii
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "fiveStars",
                  label: "Auto reply pentru ⭐⭐⭐⭐⭐ (5 stele)",
                  desc: "Răspunde automat la toate recenziile de 5 stele",
                },
                {
                  key: "fourFiveStars",
                  label: "Auto reply pentru ⭐⭐⭐⭐-⭐⭐⭐⭐⭐ (4-5 stele)",
                  desc: "Răspunde automat la recenziile de 4 și 5 stele",
                },
                {
                  key: "manualApproval",
                  label: "Aprobare manuală",
                  desc: "AI generează răspunsul, dar tu îl aprobi înainte de publicare",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-start justify-between p-4 rounded-xl border border-border/30 hover:border-brand-500/20 transition-colors"
                >
                  <div className="flex-1 mr-4">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <Switch
                    checked={autoReply[item.key as keyof typeof autoReply]}
                    onCheckedChange={(v) => setAutoReply(p => ({ ...p, [item.key]: v }))}
                    className="data-[state=checked]:bg-brand-500 flex-shrink-0"
                  />
                </div>
              ))}

              <div className="p-3 rounded-xl bg-brand-500/5 border border-brand-500/20">
                <p className="text-xs text-brand-400 font-medium mb-1">
                  💡 Recomandare
                </p>
                <p className="text-xs text-muted-foreground">
                  Activează auto-reply pentru 5 stele și aprobare manuală pentru rest. Economisești timp și menții controlul.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-4 mt-4">
          <div className="grid gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-border/50 bg-card/50 ${plan.current ? "border-brand-500/30 bg-brand-500/5" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{plan.name}</h3>
                        {plan.current && (
                          <Badge className="bg-brand-500 text-white border-0 text-xs">
                            Plan curent
                          </Badge>
                        )}
                        {plan.popular && !plan.current && (
                          <Badge className="bg-brand-500/10 text-brand-400 border-brand-500/20 text-xs">
                            <Sparkles className="w-2.5 h-2.5 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-xl font-bold mt-1">
                        {plan.price} lei
                        <span className="text-sm font-normal text-muted-foreground">/lună</span>
                      </p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {!plan.current && (
                      <Button
                        size="sm"
                        className="bg-brand-500 hover:bg-brand-600 text-white border-0"
                      >
                        Upgrade
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
