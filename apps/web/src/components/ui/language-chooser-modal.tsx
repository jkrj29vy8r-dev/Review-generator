"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/context";

const STORAGE_KEY = "arm-language-chosen";

const languages = [
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export function LanguageChooserModal() {
  const [open, setOpen] = useState(false);
  const { setLocale } = useI18n();

  useEffect(() => {
    const chosen = localStorage.getItem(STORAGE_KEY);
    if (!chosen) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (code: string) => {
    setLocale(code as any);
    localStorage.setItem(STORAGE_KEY, code);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md"
            onClick={() => choose("en")}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-border/50 bg-card/95 glass shadow-2xl p-8">
              {/* Header */}
              <div className="text-center mb-7">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                  <span className="text-2xl">🌐</span>
                </div>
                <h2 className="text-xl font-bold mb-1">Choose your language</h2>
                <p className="text-sm text-muted-foreground">Alege limba / Select your language</p>
              </div>

              {/* Languages grid */}
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang, i) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    onClick={() => choose(lang.code)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border/30 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all duration-200 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{lang.flag}</span>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{lang.name}</span>
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-[11px] text-muted-foreground mt-5">
                Poți schimba limba oricând din setări
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
