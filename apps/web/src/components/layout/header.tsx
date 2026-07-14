"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Moon, Sun, Search, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/store/sidebar-store";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggle } = useSidebarStore();

  return (
    <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/80 glass sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggle}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Caută recenzii, afaceri..."
            className="pl-9 w-64 h-9 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-brand-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* AI Credits badge */}
        <Badge className="hidden md:flex bg-brand-500/10 text-brand-400 border-brand-500/20 gap-1">
          <Sparkles className="w-3 h-3" />
          Pro Plan
        </Badge>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
          </Link>
        </Button>

        {/* User */}
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
    </header>
  );
}
