"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  BarChart3,
  Bell,
  Settings,
  Shield,
  Star,
  ChevronDown,
  Plus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import { useI18n } from "@/i18n/context";
import { type TranslationKey } from "@/i18n/translations";

const navItems: { labelKey: TranslationKey; href: string; icon: React.ElementType; badge?: string; adminOnly?: boolean }[] = [
  { labelKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "nav.reviews", href: "/reviews", icon: MessageSquare, badge: "12" },
  { labelKey: "nav.businesses", href: "/businesses", icon: Building2 },
  { labelKey: "nav.analytics", href: "/analytics", icon: BarChart3 },
  { labelKey: "nav.notifications", href: "/notifications", icon: Bell, badge: "3" },
  { labelKey: "nav.settings", href: "/settings", icon: Settings },
  { labelKey: "nav.admin", href: "/admin", icon: Shield, adminOnly: true },
];

const businesses = [
  { name: "Restaurant La Bunica", type: "restaurant", color: "bg-amber-500" },
  { name: "Hotel Panoramic", type: "hotel", color: "bg-sky-500" },
  { name: "Clinică Zâmbetul", type: "clinica", color: "bg-emerald-500" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [businessExpanded, setBusinessExpanded] = useState(true);
  const { isOpen } = useSidebarStore();
  const { t } = useI18n();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 lg:z-auto",
          "w-64 flex flex-col border-r border-border/50 bg-card/50 glass",
          "lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 p-4 border-b border-border/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center flex-shrink-0">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">AI Review Manager</p>
            <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
          </div>
        </div>

        {/* AI Usage */}
        <div className="px-3 py-3 border-b border-border/50">
          <div className="bg-brand-500/10 rounded-xl p-3 border border-brand-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-brand-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Credits
              </span>
              <span className="text-xs text-muted-foreground">∞ Pro</span>
            </div>
            <div className="h-1.5 bg-brand-500/20 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-brand-500 to-violet-500 rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">127 {t("nav.reviews").toLowerCase()} luna aceasta</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                  isActive
                    ? "bg-brand-500/10 text-brand-400 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 flex-shrink-0",
                    isActive ? "text-brand-400" : ""
                  )}
                />
                <span className="flex-1">{t(item.labelKey)}</span>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs px-1.5 py-0",
                      isActive
                        ? "bg-brand-500/20 text-brand-400"
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
          <div className="pt-4">
            <button
              onClick={() => setBusinessExpanded(!businessExpanded)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{t("nav.businesses").toUpperCase()}</span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200",
                  businessExpanded ? "rotate-0" : "-rotate-90"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {businessExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 space-y-0.5">
                    {businesses.map((biz) => (
                      <Link
                        key={biz.name}
                        href={`/businesses/${encodeURIComponent(biz.name)}`}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                      >
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full flex-shrink-0",
                            biz.color
                          )}
                        />
                        <span className="truncate text-xs">{biz.name}</span>
                      </Link>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 text-xs text-muted-foreground hover:text-foreground h-8 px-3"
                      asChild
                    >
                      <Link href="/businesses/new">
                        <Plus className="w-3.5 h-3.5" />
                        + {t("nav.businesses")}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border/50">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>{t("settings.title")}</span>
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
