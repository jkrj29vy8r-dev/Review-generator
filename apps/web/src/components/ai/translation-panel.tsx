"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Languages, Loader2, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_LANGUAGES, LANGUAGE_MAP } from "@/lib/languages";

interface TranslationPanelProps {
  text: string;
  sourceLang?: string;
  translation: string | null;
  onTranslate: (targetLang: string) => void;
}

export function TranslationPanel({
  text,
  sourceLang,
  translation,
  onTranslate,
}: TranslationPanelProps) {
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async (lang: string) => {
    setLoading(true);
    try {
      await onTranslate(lang);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (translation) {
      await navigator.clipboard.writeText(translation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sourceName = sourceLang && LANGUAGE_MAP[sourceLang]
    ? `${LANGUAGE_MAP[sourceLang].flag} ${LANGUAGE_MAP[sourceLang].name}`
    : "Originală";

  const targetName = LANGUAGE_MAP[targetLang]
    ? `${LANGUAGE_MAP[targetLang].flag} ${LANGUAGE_MAP[targetLang].name}`
    : targetLang;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <Languages className="w-3.5 h-3.5 text-brand-400" />
        Traducere instantanee
      </div>

      <div className="flex items-center gap-2">
        {/* Source language display */}
        <div className="flex-1 h-8 px-3 rounded-lg border border-border/30 bg-muted/20 flex items-center text-xs text-muted-foreground">
          {sourceName}
        </div>

        <span className="text-muted-foreground text-xs">→</span>

        {/* Target language selector */}
        <Select
          value={targetLang}
          onValueChange={(v) => {
            setTargetLang(v);
          }}
        >
          <SelectTrigger className="flex-1 h-8 text-xs border-border/50 bg-card/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="text-xs">
                {lang.flag} {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          size="sm"
          onClick={() => handleTranslate(targetLang)}
          disabled={loading}
          className="h-8 text-xs bg-brand-500 hover:bg-brand-600 text-white border-0 px-3"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Languages className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {/* Translation result */}
      {loading && (
        <div className="p-3 rounded-xl bg-brand-500/5 border border-brand-500/20 animate-pulse">
          <div className="h-3 bg-brand-500/20 rounded w-3/4 mb-2" />
          <div className="h-3 bg-brand-500/20 rounded w-1/2" />
        </div>
      )}

      {!loading && translation && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-3 rounded-xl bg-brand-500/5 border border-brand-500/20"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-brand-400">{targetName}</span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => handleTranslate(targetLang)}
                title="Retraduce"
              >
                <RefreshCw className="w-3 h-3 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={handleCopy}
                title="Copiază"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{translation}</p>
        </motion.div>
      )}
    </div>
  );
}
