"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Star, Zap, BarChart3, Globe, Shield, ArrowRight, CheckCircle2,
  MessageSquare, TrendingUp, Sparkles, Building2, Clock, Menu, X,
  ChevronRight, Play, Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Particles } from "@/components/ui/particles";
import { HolographicGlobe } from "@/components/ui/holographic-globe";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TiltCard } from "@/components/ui/tilt-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    title: "AI Reply Generator",
    description: "3 variante perfecte instant. 14 tonuri. GPT-4o + Claude. Personalizat pentru fiecare recenzie.",
    color: "from-brand-500 to-violet-500",
    glow: "rgba(97,114,243,0.4)",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Auto Reply 24/7",
    description: "Activezi o dată, funcționează non-stop. Răspunsuri automate la recenziile de 5 stele.",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.4)",
    delay: 0.1,
  },
  {
    icon: BarChart3,
    title: "AI Insights",
    description: "Analiză sentiment, rating trends, cuvinte cheie, timp economisit — în timp real.",
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.4)",
    delay: 0.2,
  },
  {
    icon: Globe,
    title: "100+ Limbi",
    description: "Auto-detect limbă recenzie. Răspuns în aceeași limbă. Force Language mode.",
    color: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.4)",
    delay: 0.3,
  },
  {
    icon: Building2,
    title: "Multi Business",
    description: "Restaurant, hotel, clinică, salon — toate dintr-un singur dashboard premium.",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.4)",
    delay: 0.4,
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "Multi-user, roluri granulare, audit log, API access, SLA 99.9%.",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.4)",
    delay: 0.5,
  },
];

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Start fără risc",
    features: ["30 răspunsuri AI/lună", "1 locație", "Istoric 30 zile", "Suport email"],
    cta: "Începe gratuit",
    popular: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "49",
    description: "Pentru afaceri active",
    features: ["Răspunsuri AI nelimitate", "Auto Reply activat", "AI Insights avansat", "3 locații", "Traduceri 100+ limbi", "Suport prioritar 24/7"],
    cta: "Alege Pro acum",
    popular: true,
    badge: "⭐ Cel mai ales",
  },
  {
    name: "Business",
    price: "149",
    description: "Lanțuri & grupuri",
    features: ["Tot ce e în Pro", "Locații nelimitate", "Echipă nelimitată", "API access + webhooks", "Rapoarte white-label", "Manager dedicat"],
    cta: "Contactează sales",
    popular: false,
    badge: null,
  },
];

const stats = [
  { label: "Recenzii gestionate", value: 2400000, suffix: "+", prefix: "", decimals: 0, display: "2.4M+" },
  { label: "Ore economisit", value: 48000, suffix: "+", prefix: "", decimals: 0, display: "48k+" },
  { label: "Rating crescut", value: 0.8, suffix: "★", prefix: "+", decimals: 1, display: "+0.8★" },
  { label: "Afaceri active", value: 1200, suffix: "+", prefix: "", decimals: 0, display: "1,200+" },
];

const testimonials = [
  {
    text: "Am redus timpul pe recenzii de la 2 ore/zi la 10 minute. ROI instant.",
    name: "Alexandru M.",
    role: "Owner, Restaurant La Bunica",
    rating: 5,
    avatar: "A",
    color: "from-amber-400 to-orange-500",
  },
  {
    text: "Ratingul nostru a crescut de la 4.1 la 4.8 în 3 luni. Clienții observă că răspundem.",
    name: "Maria P.",
    role: "Manager, Hotel Panoramic",
    rating: 5,
    avatar: "M",
    color: "from-brand-400 to-violet-500",
  },
  {
    text: "Cel mai bun tool SaaS din 2024. Design impecabil, funcționalitate perfectă.",
    name: "Ionuț D.",
    role: "CEO, Clinica Zâmbetul",
    rating: 5,
    avatar: "I",
    color: "from-emerald-400 to-teal-500",
  },
];

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 border-b border-border/50 glass"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-glow-sm"
          >
            <Star className="w-5 h-5 text-white fill-white" />
          </motion.div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            AI Review Manager
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {["Funcții", "Prețuri", "Demo"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground transition-colors relative group"
              whileHover={{ y: -1 }}
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-brand-500 to-violet-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground hover:text-foreground" asChild>
              <Link href="/sign-in">Autentificare</Link>
            </Button>
            <MagneticButton>
              <Button
                size="sm"
                className="bg-gradient-to-r from-brand-500 to-violet-500 text-white border-0 shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
                asChild
              >
                <Link href="/sign-up">
                  Încearcă gratuit
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Link>
              </Button>
            </MagneticButton>
          </SignedOut>
          <SignedIn>
            <Button size="sm" className="bg-gradient-to-r from-brand-500 to-violet-500 text-white border-0" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 glass overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-3">
              {["Funcții", "Prețuri", "Demo"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMobileOpen(false)}>
                  {item}
                </a>
              ))}
              <Link href="/sign-up" className="mt-2">
                <Button className="w-full bg-gradient-to-r from-brand-500 to-violet-500 text-white border-0">
                  Încearcă gratuit
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <motion.div style={{ y, opacity }} className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left — text */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/5 text-sm text-brand-400 ai-badge"
            >
              <Sparkles className="w-4 h-4" />
              <span>GPT-4o + Claude · 100+ limbi · 14 tonuri</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              <span className="block text-foreground">Recenzii Google</span>
              <span className="block gradient-text-aurora">răspunse perfect</span>
              <span className="block text-foreground">cu AI.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Platforma premium care generează răspunsuri perfecte la recenzii în{" "}
              <strong className="text-foreground">câteva secunde</strong>.
              Economisești timp, îmbunătățești ratingul, câștigai clienți.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <MagneticButton>
                <Button
                  size="lg"
                  className="relative group bg-gradient-to-r from-brand-500 via-violet-500 to-brand-500 bg-[size:200%] text-white border-0 shadow-glow-md hover:shadow-glow-lg transition-all duration-500 text-base px-8 h-12 animate-gradient-x"
                  asChild
                >
                  <Link href="/sign-up">
                    <Sparkles className="mr-2 w-4 h-4" />
                    Încearcă gratuit 14 zile
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="border-border/60 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all h-12 text-base"
                asChild
              >
                <Link href="/dashboard">
                  <Play className="mr-2 w-4 h-4 text-brand-400" />
                  Vezi demo live
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Fără card bancar · Setup 2 minute · Cancel oricând
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["A", "M", "I", "C", "R"].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: `hsl(${210 + i * 40}, 80%, 55%)`,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="text-foreground font-semibold">1,200+</span> afaceri active
                <span className="mx-2">·</span>
                <span className="text-amber-400">★★★★★</span>
                <span className="ml-1">4.9/5</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <HolographicGlobe />
          {/* Floating badges */}
          {[
            { icon: Star, label: "4.9★ Rating", color: "from-amber-500 to-orange-500", top: "15%", left: "-5%", delay: 1 },
            { icon: Sparkles, label: "AI Generated", color: "from-brand-500 to-violet-500", top: "65%", right: "-5%", delay: 1.2 },
            { icon: TrendingUp, label: "+0.8★ mediu", color: "from-emerald-500 to-teal-500", bottom: "10%", left: "5%", delay: 1.4 },
          ].map(({ icon: Icon, label, color, delay, ...pos }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay }}
              className="absolute"
              style={pos as React.CSSProperties}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 glass border border-border/50 shadow-card-premium text-xs font-medium whitespace-nowrap`}
              >
                <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                {label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-current" />
        </div>
        <span className="text-xs">Scroll</span>
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-violet-500/5 to-brand-500/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="text-center group"
            >
              <div className="text-4xl font-bold gradient-text mb-2 tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  duration={2000}
                />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="funcții" className="py-28 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-5 bg-brand-500/10 text-brand-400 border-brand-500/20 px-4 py-1.5">
              Funcții Premium
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
              Tot ce ai nevoie pentru{" "}
              <span className="gradient-text">recenzii perfecte</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              De la generare AI la publicare automată pe Google — o platformă completă pentru reputația ta online.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
            >
              <TiltCard
                glowColor={feature.glow}
                className="h-full"
              >
                <div className="group relative h-full p-6 rounded-2xl border border-border/50 bg-card/60 glass-card animated-border overflow-hidden cursor-default">
                  {/* Background glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${feature.glow}20 0%, transparent 70%)`,
                    }}
                  />

                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                    {/* Icon glow */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} blur-lg opacity-50 group-hover:opacity-80 transition-opacity -z-10`} />
                  </div>

                  <h3 className="font-semibold text-lg mb-2 group-hover:text-foreground transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="demo" className="py-20 px-4 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse inline-block" />
              Live Preview
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Dashboard <span className="gradient-text">ultra-premium</span>
            </h2>
            <p className="text-muted-foreground text-lg">Design care lasă impresia "WOW" din primul minut</p>
          </div>

          {/* Browser mockup */}
          <div className="relative rounded-2xl border border-border/40 bg-card/40 glass shadow-3d overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 rounded-md bg-background/50 flex items-center px-3 gap-2 max-w-xs mx-auto">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-muted-foreground/70">dashboard.aireviewmanager.ro</span>
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Sidebar mini */}
              <div className="hidden lg:flex flex-col gap-2 p-3 rounded-xl bg-muted/20 border border-border/30">
                {["Dashboard", "Recenzii", "Statistici", "Setări"].map((item, i) => (
                  <div
                    key={item}
                    className={cn(
                      "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all",
                      i === 0 ? "bg-brand-500/15 text-brand-400 font-medium" : "text-muted-foreground"
                    )}
                  >
                    <div className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? "bg-brand-400" : "bg-muted-foreground/40")} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="lg:col-span-3 space-y-4">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Rating Mediu", value: "4.8★", change: "+0.3", icon: Star, color: "text-amber-400", bg: "from-amber-500/10 to-orange-500/10" },
                    { label: "Răspunsuri AI", value: "284", change: "+12 azi", icon: Sparkles, color: "text-brand-400", bg: "from-brand-500/10 to-violet-500/10" },
                    { label: "Rata Răspuns", value: "96%", change: "↑ 8%", icon: TrendingUp, color: "text-emerald-400", bg: "from-emerald-500/10 to-teal-500/10" },
                  ].map((stat) => (
                    <div key={stat.label} className={`p-3 rounded-xl bg-gradient-to-br ${stat.bg} border border-border/30`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                        <stat.icon className={`w-3 h-3 ${stat.color}`} />
                      </div>
                      <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-[10px] text-emerald-500 mt-0.5">{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Review card */}
                <div className="p-4 rounded-xl bg-background/40 border border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0">M</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-medium">Maria Ionescu</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />)}
                        </div>
                        <span className="text-[10px] text-muted-foreground">acum 2 ore</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        &ldquo;Cel mai bun restaurant din București! Mâncarea a fost excepțională...&rdquo;
                      </p>
                    </div>
                    <Badge className="bg-brand-500/10 text-brand-400 border-brand-500/20 text-[10px] shrink-0 ai-badge">
                      <Sparkles className="w-2 h-2 mr-1" />AI Ready
                    </Badge>
                  </div>
                  <div className="mt-3 p-2.5 rounded-lg bg-brand-500/5 border border-brand-500/15">
                    <p className="text-[11px] text-foreground/80 leading-relaxed">
                      ✨ <strong>Variantă 1:</strong> Bună ziua, Maria! Vă mulțumim sincer pentru cuvintele frumoase!
                      Suntem bucuroși că mâncarea v-a plăcut. Vă așteptăm cu drag! 🍽️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow bottom */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-brand-500/20 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Ce spun <span className="gradient-text">clienții noștri</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <TiltCard className="h-full">
                <div className="h-full p-6 rounded-2xl border border-border/50 bg-card/60 glass-card">
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="prețuri" className="py-24 px-4 relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="container max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <Badge className="mb-5 bg-brand-500/10 text-brand-400 border-brand-500/20">
            Prețuri Transparente
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Alege planul <span className="gradient-text">potrivit</span>
          </h2>
          <p className="text-muted-foreground text-lg">Fără surprize. Cancel oricând. Upgrade instant.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: plan.popular ? 1.04 : 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <TiltCard disabled={!plan.popular} tiltAmount={4} className="h-full">
                <div
                  className={cn(
                    "relative h-full rounded-2xl p-6 border transition-all duration-300",
                    plan.popular
                      ? "border-brand-500/50 bg-gradient-to-br from-card via-brand-500/5 to-violet-500/5 shadow-glow-md"
                      : "border-border/50 bg-card/60 glass-card"
                  )}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-brand-500 to-violet-500 text-white shadow-glow-sm">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">lei/lună</span>
                  </div>

                  <ul className="space-y-3 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={cn("w-4 h-4 shrink-0", plan.popular ? "text-brand-400" : "text-emerald-500")} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      "w-full transition-all duration-300",
                      plan.popular
                        ? "bg-gradient-to-r from-brand-500 to-violet-500 text-white border-0 shadow-glow-sm hover:shadow-glow-md"
                        : "border-border/60 hover:border-brand-500/50"
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/sign-up">
                      {plan.cta}
                      {plan.popular && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Link>
                  </Button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-28 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-violet-500/15 to-brand-500/20" />
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

          {/* Animated blobs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-500/15 rounded-full blur-3xl animate-aurora-float" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-aurora-float" style={{ animationDelay: "3s" }} />

          <div className="relative py-20 px-8 text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-glow-md"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
              Economisești{" "}
              <span className="gradient-text-aurora">ore întregi</span>
              <br />
              în fiecare săptămână
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Fiecare recenzie primește un răspuns personalizat, profesional, în orice limbă. În câteva secunde.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-500 via-violet-500 to-brand-500 bg-[size:200%] text-white border-0 shadow-glow-lg hover:shadow-glow-lg animate-gradient-x text-base h-13 px-10"
                  asChild
                >
                  <Link href="/sign-up">
                    Încearcă gratuit 14 zile
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Fără card bancar · Setup 2 minute · 14 zile trial gratuit complet
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Premium backgrounds */}
      <AuroraBackground />
      <Particles count={50} />

      <NavBar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <DashboardPreview />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 relative">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-semibold">AI Review Manager</span>
          </Link>
          <p className="text-sm text-muted-foreground">© 2024 AI Review Manager. Toate drepturile rezervate.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            {["Confidențialitate", "Termeni", "Contact"].map((link) => (
              <Link key={link} href={`/${link.toLowerCase()}`} className="hover:text-foreground transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
