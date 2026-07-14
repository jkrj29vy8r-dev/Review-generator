"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, MessageSquare, Building2, BarChart3, Bell, Settings, Shield,
  Star, ChevronDown, Plus, Sparkles, ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import { useI18n } from "@/i18n/context";
import { type TranslationKey } from "@/i18n/translations";

const navItems: {
  labelKey: TranslationKey;
  href: string;
  icon: React.ElementType;
  badge?: string;
  gradient?: string;
}[] = [
  { labelKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard, gradient: "from-brand-500 to-violet-500" },
  { labelKey: "nav.reviews", href: "/reviews", icon: MessageSquare, badge: "12", gradient: "from-emerald-500 to-teal-500" },
  { labelKey: "nav.businesses", href: "/businesses", icon: Building2, gradient: "from-amber-500 to-orange-500" },
  { labelKey: "nav.analytics", href: "/analytics", icon: BarChart3, gradient: "from-sky-500 to-blue-500" },
  { labelKey: "nav.notifications", href: "/notifications", icon: Bell, badge: "3", gradient: "from-rose-500 to-pink-500" },
  { labelKey: "nav.settings", href: "/settings", icon: Settings, gradient: "from-slate-400 to-slate-500" },
  { labelKey: "nav.admin", href: "/admin", icon: Shield, gradient: "from-violet-500 to-purple-600" },
];

const businesses = [
  { name: "Restaurant La Bunica", initial: "R", color: "from-amber-500 to-orange-500", active: true },
  { name: "Hotel Panoramic", initial: "H", color: "from-sky-500 to-blue-500", active: false },
  { name: "Clinică Zâmbetul", initial: "C", color: "from-emerald-500 to-teal-500", active: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const [businessExpanded, setBusinessExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { isOpen, close } = useSidebarStore();
  const { t } = useI18n();

  const toggleCollapse = useCallback(() => setCollapsed(v => !v), []);

  // Close mobile sidebar on route change
  useEffect(() => { close(); }, [pathname, close]);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Zero-width wrapper on mobile so sidebar doesn't shift layout */}
      <div className="lg:contents w-0 lg:w-auto flex-shrink-0">
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
          width: collapsed ? 64 : 256,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-40",
          "flex flex-col border-r border-border/40",
          "bg-card/40 glass",
        )}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/3 via-transparent to-violet-500/3 pointer-events-none" />

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 z-50 hidden lg:flex w-6 h-6 rounded-full border border-border/60 bg-card items-center justify-center shadow-card-premium hover:border-brand-500/40 hover:shadow-glow-sm transition-all duration-300"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3 text-muted-foreground" />
            : <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          }
        </button>

        {/* Logo */}
        <div className={cn("flex items-center p-4 border-b border-border/40", collapsed ? "justify-center" : "gap-3")}>
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-glow-sm"
          >
            <Star className="w-5 h-5 text-white fill-white" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="min-w-0 overflow-hidden"
              >
                <p className="font-bold text-sm truncate">AI Review Manager</p>
                <p className="text-[11px] text-brand-400 truncate flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Pro Plan Active
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AI Usage */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 py-3 border-b border-border/40 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-brand-500/10 to-violet-500/5 rounded-xl p-3 border border-brand-500/15">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-brand-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    AI Credits
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">∞ Pro</span>
                </div>
                <div className="h-1 bg-border/40 rounded-full overflow-hidden mb-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "33%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-brand-500 to-violet-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">127 răspunsuri luna aceasta</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
          {navItems.map((item) => {
            const isActive = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? t(item.labelKey) : undefined}
                className={cn(
                  "group relative flex items-center rounded-xl text-sm transition-all duration-200 overflow-hidden",
                  collapsed ? "px-0 py-2.5 justify-center" : "gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-brand-500/10 text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-gradient-to-r from-brand-500/15 to-violet-500/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}

                {/* Icon */}
                <div className={cn(
                  "relative flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300",
                  isActive
                    ? `bg-gradient-to-br ${item.gradient} shadow-sm`
                    : "group-hover:bg-muted"
                )}>
                  <item.icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : "")} />
                </div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 truncate relative"
                    >
                      {t(item.labelKey)}
                    </motion.span>
                  )}
                </AnimatePresence>

                {!collapsed && item.badge && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] px-1.5 py-0 h-4 min-w-4 flex items-center justify-center",
                      isActive
                        ? "bg-brand-500/20 text-brand-400 border-brand-500/30"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}

          {/* Businesses section */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-5"
              >
                <button
                  onClick={() => setBusinessExpanded(!businessExpanded)}
                  className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-semibold text-muted-foreground/60 hover:text-muted-foreground uppercase tracking-widest transition-colors"
                >
                  <span>{t("nav.businesses")}</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", businessExpanded ? "" : "-rotate-90")} />
                </button>

                <AnimatePresence initial={false}>
                  {businessExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-1"
                    >
                      <div className="space-y-0.5">
                        {businesses.map((biz) => (
                          <Link
                            key={biz.name}
                            href={`/businesses/${encodeURIComponent(biz.name)}`}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all",
                              biz.active
                                ? "bg-muted/60 text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                            )}
                          >
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${biz.color} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                              {biz.initial}
                            </div>
                            <span className="truncate">{biz.name}</span>
                            {biz.active && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            )}
                          </Link>
                        ))}
                        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all border border-dashed border-border/50 hover:border-brand-500/30 mt-1">
                          <div className="w-6 h-6 rounded-lg border border-dashed border-border flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </div>
                          Adaugă afacere
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border/40">
          <Link
            href="/settings"
            className={cn(
              "flex items-center rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all p-2",
              collapsed ? "justify-center" : "gap-2.5 px-3 py-2"
            )}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {t("settings.title")}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </motion.aside>
      </div>
    </>
  );
}
