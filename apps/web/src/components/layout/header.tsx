"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Moon, Sun, Search, Sparkles, Command } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/store/sidebar-store";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useI18n } from "@/i18n/context";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggle } = useSidebarStore();
  const { t } = useI18n();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-14 border-b border-border/40 flex items-center justify-between px-5 bg-background/60 glass sticky top-0 z-20"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8 rounded-lg"
          onClick={toggle}
        >
          <Menu className="w-4 h-4" />
        </Button>

        {/* Search */}
        <div className="relative hidden md:flex items-center group">
          <Search className="absolute left-3 w-3.5 h-3.5 text-muted-foreground/60 group-focus-within:text-brand-400 transition-colors" />
          <Input
            placeholder={t("reviews.search")}
            className="pl-9 pr-12 w-56 h-8 bg-muted/30 border-border/40 focus-visible:ring-1 focus-visible:ring-brand-500/40 focus-visible:border-brand-500/40 text-sm transition-all focus-visible:w-72 rounded-xl"
          />
          <div className="absolute right-2.5 flex items-center gap-0.5 pointer-events-none opacity-50">
            <Command className="w-3 h-3" />
            <span className="text-[10px]">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* AI Credits badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="hidden md:flex items-center gap-1.5 bg-brand-500/8 text-brand-400 border-brand-500/20 px-2.5 py-1 rounded-xl ai-badge">
            <Sparkles className="w-3 h-3" />
            <span className="text-xs">Pro</span>
          </Badge>
        </motion.div>

        {/* Language switcher */}
        <LanguageSwitcher />

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          asChild
        >
          <Link href="/notifications">
            <Bell className="h-4 w-4" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-background"
            />
          </Link>
        </Button>

        {/* Divider */}
        <div className="w-px h-5 bg-border/60 mx-1" />

        {/* User */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-7 h-7 rounded-lg ring-2 ring-border/40 hover:ring-brand-500/40 transition-all",
            },
          }}
        />
      </div>
    </motion.header>
  );
}
