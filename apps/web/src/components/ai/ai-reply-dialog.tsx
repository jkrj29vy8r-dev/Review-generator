"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Send,
  RefreshCw,
  Copy,
  Check,
  Star,
  Loader2,
  Languages,
  Globe,
  Lock,
  AlignLeft,
  AlignCenter,
  Smile,
  Briefcase,
  Crown,
  MessageSquare,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { SUPPORTED_LANGUAGES, LANGUAGE_MAP } from "@/lib/languages";
import { TranslationPanel } from "./translation-panel";

const TONES = [
  { value: "PROFESIONAL", label: "Profesional", icon: Briefcase },
  { value: "PRIETENOS", label: "Prietenos", icon: Smile },
  { value: "ELEGANT", label: "Elegant", icon: Crown },
  { value: "PREMIUM", label: "Premium", icon: Crown },
  { value: "LUX", label: "Lux", icon: Crown },
  { value: "RESTAURANT", label: "Restaurant", icon: MessageSquare },
  { value: "HOTEL", label: "Hotel", icon: MessageSquare },
  { value: "CLINICA", label: "Clinică", icon: MessageSquare },
  { value: "AUTO", label: "Auto", icon: MessageSquare },
  { value: "SALON", label: "Salon", icon: MessageSquare },
  { value: "CORPORATE", label: "Corporate", icon: Briefcase },
  { value: "RELAXAT", label: "Relaxat", icon: Smile },
  { value: "AMUZANT", label: "Amuzant", icon: Smile },
  { value: "FORMAL", label: "Formal", icon: Briefcase },
];

const REWRITE_OPTIONS = [
  { label: "Rescrie", action: "rewrite", icon: RefreshCw },
  { label: "Mai scurt", action: "shorter", icon: AlignLeft },
  { label: "Mai lung", action: "longer", icon: AlignCenter },
  { label: "Mai prietenos", action: "friendlier", icon: Smile },
  { label: "Mai profesionist", action: "professional", icon: Briefcase },
  { label: "Mai elegant", action: "elegant", icon: Crown },
  { label: "Mai empatic", action: "empathetic", icon: MessageSquare },
];

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  business: string;
  businessType: string;
  city: string;
}

interface AIReplyDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  review: Review;
}

export function AIReplyDialog({ open, onOpenChange, review }: AIReplyDialogProps) {
  const [tone, setTone] = useState("PROFESIONAL");
  const [languageMode, setLanguageMode] = useState<"auto" | string>("auto");
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [customText, setCustomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [detectedLang, setDetectedLang] = useState<{ code: string; name: string; flag: string } | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [reviewTranslation, setReviewTranslation] = useState<string | null>(null);
  const [detectingLang, setDetectingLang] = useState(false);
  const { toast } = useToast();

  // Auto-detect review language on open
  useEffect(() => {
    if (open && review.text) {
      detectReviewLanguage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, review.text]);

  const detectReviewLanguage = async () => {
    setDetectingLang(true);
    try {
      const res = await fetch("/api/ai/detect-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: review.text }),
      });
      const data = await res.json();
      setDetectedLang({ code: data.code, name: data.name, flag: data.flag });
    } catch {
      setDetectedLang({ code: "ro", name: "Română", flag: "🇷🇴" });
    } finally {
      setDetectingLang(false);
    }
  };

  const translateReview = async (targetLang: string) => {
    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: review.text,
          targetLanguage: targetLang,
          sourceLanguage: detectedLang?.code,
        }),
      });
      const data = await res.json();
      setReviewTranslation(data.translation || null);
    } catch {
      toast({ title: "Eroare traducere", description: "Nu s-a putut traduce recenzia.", variant: "destructive" });
    }
  };

  const generateReply = useCallback(async (rewriteAction?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText: review.text,
          rating: review.rating,
          authorName: review.author,
          businessName: review.business,
          businessType: review.businessType,
          city: review.city,
          tone,
          languageMode,
          rewriteAction,
          currentText: selectedVariant !== null ? variants[selectedVariant] : undefined,
        }),
      });

      const data = await res.json();
      if (data.variants?.length) {
        setVariants(data.variants);
        setSelectedVariant(0);
        setCustomText(data.variants[0]);
        // Update detected lang from reply
        if (data.detectedLanguage && LANGUAGE_MAP[data.detectedLanguage]) {
          const l = LANGUAGE_MAP[data.detectedLanguage];
          setDetectedLang({ code: l.code, name: l.name, flag: l.flag });
        }
      }
    } catch {
      toast({ title: "Eroare AI", description: "Nu s-a putut genera răspunsul. Încearcă din nou.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [tone, languageMode, review, selectedVariant, variants, toast]);

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePublish = async () => {
    if (!customText.trim()) return;
    setPublishing(true);
    try {
      await fetch("/api/reviews/publish-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id, replyText: customText, tone }),
      });
      toast({ title: "✅ Publicat pe Google!", description: "Răspunsul a fost trimis cu succes." });
      onOpenChange(false);
    } catch {
      toast({ title: "Eroare publicare", description: "Încearcă din nou.", variant: "destructive" });
    } finally {
      setPublishing(false);
    }
  };

  const currentLangDisplay =
    languageMode === "auto"
      ? { label: "Auto Detect", sub: detectedLang ? `Detectat: ${detectedLang.flag} ${detectedLang.name}` : "Detectare limbă...", flag: "🌐" }
      : { label: LANGUAGE_MAP[languageMode]?.name || languageMode, sub: "Limbă forțată", flag: LANGUAGE_MAP[languageMode]?.flag || "🌐" };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto border-border/50 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-500/10">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
            AI Reply Generator
            <Badge className="ml-auto bg-brand-500/10 text-brand-400 border-brand-500/20 text-xs">
              GPT-4o
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Review preview */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-sm font-medium">{review.author}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("w-3.5 h-3.5", i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30")} />
                ))}
              </div>
              {/* Detected language badge */}
              {detectingLang ? (
                <Badge className="bg-muted/50 text-muted-foreground border-0 text-xs animate-pulse">
                  <Globe className="w-2.5 h-2.5 mr-1" />
                  Detectare...
                </Badge>
              ) : detectedLang ? (
                <Badge className="bg-brand-500/10 text-brand-400 border-brand-500/20 text-xs">
                  {detectedLang.flag} {detectedLang.name}
                </Badge>
              ) : null}
              <div className="ml-auto flex gap-1.5">
                {/* Translate review button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
                  onClick={() => setShowTranslation(!showTranslation)}
                >
                  <Languages className="w-3 h-3" />
                  {showTranslation ? "Ascunde" : "Traduce"}
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>

            {/* Translation panel for review */}
            <AnimatePresence>
              {showTranslation && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <TranslationPanel
                      text={review.text}
                      sourceLang={detectedLang?.code}
                      onTranslate={translateReview}
                      translation={reviewTranslation}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Tone */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Ton</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="border-border/50 bg-card/50 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex items-center gap-2">
                        <t.icon className="w-3.5 h-3.5 text-muted-foreground" />
                        {t.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Mode */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Limbă răspuns</label>
              <Select value={languageMode} onValueChange={setLanguageMode}>
                <SelectTrigger className="border-border/50 bg-card/50 h-9 text-sm">
                  <div className="flex items-center gap-2">
                    {languageMode === "auto" ? (
                      <>
                        <Globe className="w-3.5 h-3.5 text-brand-400" />
                        <span>Auto Detect</span>
                        {detectedLang && (
                          <Badge className="bg-brand-500/10 text-brand-400 border-0 text-xs ml-1 py-0 h-4">
                            {detectedLang.flag} {detectedLang.name}
                          </Badge>
                        )}
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{LANGUAGE_MAP[languageMode]?.flag} {LANGUAGE_MAP[languageMode]?.name}</span>
                      </>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {/* Auto detect option */}
                  <SelectItem value="auto">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-brand-400" />
                      <div>
                        <span className="font-medium">🌐 Auto Detect</span>
                        <span className="text-xs text-muted-foreground ml-2">Detectează automat</span>
                      </div>
                    </div>
                  </SelectItem>
                  {/* Separator */}
                  <div className="px-2 py-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      Forțează limbă
                    </div>
                  </div>
                  {/* Language list */}
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                        <span className="text-xs text-muted-foreground">({lang.nameEn})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Language mode info banner */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs",
            languageMode === "auto"
              ? "bg-brand-500/5 border border-brand-500/20 text-brand-400"
              : "bg-amber-500/5 border border-amber-500/20 text-amber-400"
          )}>
            {languageMode === "auto" ? (
              <>
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  <strong>Auto Detect:</strong> AI detectează automat limba recenziei și răspunde în aceeași limbă.
                  {detectedLang && <span className="ml-1">Limbă detectată: <strong>{detectedLang.flag} {detectedLang.name}</strong></span>}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  <strong>Limbă forțată:</strong> Răspunsul va fi generat în {LANGUAGE_MAP[languageMode]?.flag} <strong>{LANGUAGE_MAP[languageMode]?.name}</strong>, indiferent de limba recenziei.
                </span>
              </>
            )}
          </div>

          {/* Generate button */}
          <Button
            onClick={() => generateReply()}
            disabled={loading}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white border-0 h-10"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {loading ? "Se generează..." : variants.length > 0 ? "Regenerează (3 variante)" : "Generează 3 variante AI"}
          </Button>

          {/* Generated variants */}
          <AnimatePresence>
            {variants.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Alege o variantă:</p>
                  {detectedLang && languageMode === "auto" && (
                    <Badge className="bg-brand-500/10 text-brand-400 border-brand-500/20 text-xs gap-1">
                      {detectedLang.flag} {detectedLang.name}
                    </Badge>
                  )}
                </div>

                {variants.map((variant, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => { setSelectedVariant(i); setCustomText(variant); }}
                    className={cn(
                      "relative p-4 rounded-xl border cursor-pointer transition-all",
                      selectedVariant === i
                        ? "border-brand-500/50 bg-brand-500/5"
                        : "border-border/30 hover:border-brand-500/30 hover:bg-muted/20"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn(
                        "text-xs",
                        selectedVariant === i
                          ? "bg-brand-500 text-white border-0"
                          : "bg-muted/50 text-muted-foreground border-0"
                      )}>
                        {selectedVariant === i ? "✓ " : ""}Varianta {i + 1}
                      </Badge>
                      <div className="ml-auto flex gap-1">
                        {/* Translate this variant */}
                        <VariantTranslateButton text={variant} sourceLang={detectedLang?.code} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => { e.stopPropagation(); handleCopy(variant, i); }}
                        >
                          {copied === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{variant}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rewrite options */}
          {variants.length > 0 && selectedVariant !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Rescrie varianta selectată:</p>
              <div className="flex flex-wrap gap-2">
                {REWRITE_OPTIONS.map((opt) => (
                  <Button
                    key={opt.action}
                    variant="outline"
                    size="sm"
                    onClick={() => generateReply(opt.action)}
                    disabled={loading}
                    className="h-7 text-xs border-border/50 hover:border-brand-500/30 hover:bg-brand-500/5"
                  >
                    <opt.icon className="w-3 h-3 mr-1.5" />
                    {opt.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Edit area */}
          {(variants.length > 0 || customText) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Editează răspunsul final:</label>
                <span className="text-xs text-muted-foreground">{customText.split(/\s+/).filter(Boolean).length} cuvinte</span>
              </div>
              <Textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Editează sau scrie propriul răspuns..."
                className="min-h-[90px] border-border/50 bg-card/50 resize-none"
              />
              {customText.length > 600 && (
                <p className="text-xs text-amber-400">⚠️ Răspuns lung — Google recomandă maxim ~600 caractere.</p>
              )}
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 border-border/50">
              Anulează
            </Button>
            <Button
              onClick={handlePublish}
              disabled={!customText.trim() || publishing}
              className="flex-1 bg-brand-500 hover:bg-brand-600 text-white border-0"
            >
              {publishing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
              Publică pe Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Mini translate button for each variant */
function VariantTranslateButton({ text, sourceLang }: { text: string; sourceLang?: string }) {
  const [open, setOpen] = useState(false);
  const [targetLang, setTargetLang] = useState("ro");
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const translate = async (lang: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: lang, sourceLanguage: sourceLang }),
      });
      const data = await res.json();
      setTranslation(data.translation || null);
    } catch {
      setTranslation("Eroare la traducere.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        title="Traduce varianta"
      >
        <Languages className="w-3 h-3 text-muted-foreground" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-8 z-50 bg-card border border-border/50 rounded-xl shadow-xl p-3 w-56 space-y-2"
          >
            <p className="text-xs font-medium">Traduce în:</p>
            <Select value={targetLang} onValueChange={(v) => { setTargetLang(v); setTranslation(null); }}>
              <SelectTrigger className="h-8 text-xs border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-48">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code} className="text-xs">
                    {l.flag} {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              className="w-full h-7 text-xs bg-brand-500 hover:bg-brand-600 text-white border-0"
              onClick={() => translate(targetLang)}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Languages className="w-3 h-3 mr-1" />}
              Traduce
            </Button>

            {translation && (
              <div className="p-2 rounded-lg bg-brand-500/5 border border-brand-500/20 text-xs text-foreground leading-relaxed">
                {translation}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
