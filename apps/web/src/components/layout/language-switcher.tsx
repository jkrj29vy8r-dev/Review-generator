"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/i18n/context";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
      <SelectTrigger className="h-8 w-auto gap-1.5 border-border/40 bg-transparent text-xs px-2 hover:bg-muted/50 focus:ring-0">
        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="hidden sm:inline text-muted-foreground">
          {localeNames[locale].flag}
        </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="max-h-72 w-52">
        {locales.map((code) => {
          const info = localeNames[code];
          return (
            <SelectItem key={code} value={code} className="text-xs">
              <span className="flex items-center gap-2">
                <span>{info.flag}</span>
                <span>{info.native}</span>
                <span className="text-muted-foreground">({info.en})</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
