"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Star,
  Zap,
  BarChart3,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Building2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Sparkles,
    title: "AI Reply Generator",
    description:
      "Generează instant 3 variante de răspuns perfecte pentru fiecare recenzie. Ton personalizabil.",
    color: "from-brand-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Auto Reply",
    description:
      "Activează răspunsul automat pentru recenziile de 5 stele. Economisești ore întregi.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Statistici AI",
    description:
      "Analiză sentiment, evoluție rating, cuvinte cheie, timp economisit — totul în timp real.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Globe,
    title: "Google Business Sync",
    description:
      "Sincronizare automată cu Google Business Profile. Recenzii, locații, fotografii.",
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Building2,
    title: "Multi Business",
    description:
      "Administrează restaurant, hotel, clinică, salon — toate dintr-un singur dashboard.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Multi User",
    description:
      "Roluri Admin, Manager, Operator. Control complet asupra accesului în echipă.",
    color: "from-purple-500 to-indigo-500",
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    period: "lună",
    description: "Perfect pentru start",
    features: [
      "30 răspunsuri AI/lună",
      "1 locație",
      "Istoric 30 zile",
      "Suport email",
    ],
    cta: "Începe gratuit",
    popular: false,
    gradient: "from-slate-600 to-slate-700",
  },
  {
    name: "Pro",
    price: "49",
    period: "lună",
    description: "Pentru afaceri active",
    features: [
      "Răspunsuri AI nelimitate",
      "Auto Reply activat",
      "AI Insights",
      "3 locații",
      "Suport prioritar",
    ],
    cta: "Alege Pro",
    popular: true,
    gradient: "from-brand-500 to-violet-600",
  },
  {
    name: "Business",
    price: "149",
    period: "lună",
    description: "Pentru lanțuri și grupuri",
    features: [
      "Tot din Pro",
      "Locații nelimitate",
      "Echipă nelimitată",
      "API access",
      "Rapoarte avansate",
    ],
    cta: "Alege Business",
    popular: false,
    gradient: "from-violet-600 to-purple-700",
  },
];

const stats = [
  { label: "Recenzii gestionate", value: "2.4M+" },
  { label: "Timp economisit", value: "48k ore" },
  { label: "Rating mediu crescut", value: "+0.8★" },
  { label: "Afaceri active", value: "1,200+" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 glass bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-lg">AI Review Manager</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">
              Funcții
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">
              Prețuri
            </Link>
            <Link href="#about" className="hover:text-foreground transition-colors">
              Despre
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <SignedOut>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Autentificare</Link>
              </Button>
              <Button size="sm" className="bg-gradient-brand text-white border-0" asChild>
                <Link href="/sign-up">Înregistrare gratuită</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="container max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-brand-500/10 text-brand-400 border-brand-500/20 px-4 py-1.5 text-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Powered by GPT-4o & Claude
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Răspunzuri{" "}
              <span className="gradient-text">inteligente</span>
              <br />
              la recenzii Google
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Platforma AI care generează răspunsuri perfecte la recenziile
              Google în câteva secunde. Economisești timp, îmbunătățești
              ratingul, câștigai clienți.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-brand text-white border-0 shadow-lg shadow-brand-500/25 text-base px-8"
                asChild
              >
                <Link href="/sign-up">
                  Începe gratuit — 30 răspunsuri/lună
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Vezi demo
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Fără card bancar necesar · Setup în 2 minute · Cancel oricând
            </p>
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="relative rounded-2xl border border-border/50 bg-card/50 glass p-1 shadow-2xl shadow-black/20 overflow-hidden">
              {/* Mockup header */}
              <div className="flex items-center gap-2 p-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">
                  dashboard.aireviewmanager.ro
                </div>
              </div>

              {/* Mockup content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Recenzii", value: "284", icon: MessageSquare, color: "text-brand-400", change: "+12 azi" },
                  { label: "Rating Mediu", value: "4.7★", icon: Star, color: "text-amber-400", change: "+0.2 luna aceasta" },
                  { label: "Rata Răspuns", value: "94%", icon: TrendingUp, color: "text-emerald-400", change: "↑ față de 82%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background/50 rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-emerald-500 mt-1">{stat.change}</div>
                  </div>
                ))}

                {/* AI Reply mockup */}
                <div className="md:col-span-3 bg-background/50 rounded-xl p-4 border border-border/50">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Maria Ionescu</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        &ldquo;Cel mai bun restaurant din București! Mâncarea a fost delicioasă...&rdquo;
                      </p>
                    </div>
                    <Badge className="bg-brand-500/10 text-brand-400 border-brand-500/20 text-xs">
                      <Sparkles className="w-2.5 h-2.5 mr-1" />
                      AI Ready
                    </Badge>
                  </div>
                  <div className="bg-brand-500/5 border border-brand-500/20 rounded-lg p-3">
                    <p className="text-xs text-foreground/80">
                      ✨ <strong>Variantă 1:</strong> Bună ziua, Maria! Vă mulțumim din suflet pentru cuvintele
                      frumoase! Suntem bucuroși că mâncarea și atmosfera v-au plăcut. Vă așteptăm cu drag
                      să reveniți! 🍽️
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-500/10 text-brand-400 border-brand-500/20">
              Funcții Premium
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Tot ce ai nevoie pentru{" "}
              <span className="gradient-text">recenzii perfecte</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              De la generare AI la publicare automată pe Google — o platformă
              completă pentru reputația ta online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 glass card-hover gradient-border"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-500/10 text-brand-400 border-brand-500/20">
              Prețuri Transparente
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Alege planul <span className="gradient-text">potrivit</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Fără surprize. Cancel oricând. Upgrade instant.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl p-6 border ${
                  plan.popular
                    ? "border-brand-500/50 bg-card shadow-2xl shadow-brand-500/10 scale-105"
                    : "border-border/50 bg-card/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-brand text-white border-0 px-4">
                      ⭐ Cel mai popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">lei/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-brand text-white border-0"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Ai nevoie de mai mult? <Link href="#contact" className="text-brand-400 hover:underline">Contactează-ne pentru Enterprise</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-brand-500/10 to-violet-500/10 border border-brand-500/20"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-brand-500/5 to-transparent" />
            </div>

            <Clock className="w-12 h-12 text-brand-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Economisești <span className="gradient-text">ore întregi</span> în fiecare săptămână
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Fiecare recenzie primește un răspuns personalizat, profesional,
              în limba română perfectă. În câteva secunde.
            </p>
            <Button
              size="lg"
              className="bg-gradient-brand text-white border-0 shadow-lg shadow-brand-500/25"
              asChild
            >
              <Link href="/sign-up">
                Începe gratuit acum
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-semibold">AI Review Manager</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 AI Review Manager. Toate drepturile rezervate.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Confidențialitate
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Termeni
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
