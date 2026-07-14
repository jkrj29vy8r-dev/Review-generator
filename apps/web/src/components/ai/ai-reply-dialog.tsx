"use client";

import { useState, useCallback } from "react";
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
  ChevronRight,
  Wand2,
  MessageSquare,
  AlignLeft,
  AlignCenter,
  Smile,
  Briefcase,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const tones = [
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

const rewriteOptions = [
  { label: "Rescrie", action: "rewrite", icon: RefreshCw },
  { label: "Mai scurt", action: "shorter", icon: AlignLeft },
  { label: "Mai lung", action: "longer", icon: AlignCenter },
  { label: "Mai prietenos", action: "friendlier", icon: Smile },
  { label: "Mai profesionist", action: "professional", icon: Briefcase },
  { label: "Mai elegant", action: "elegant", icon: Crown },
  { label: "Mai empatic", action: "empathetic", icon: MessageSquare },
];

interface AIReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: {
    id: string;
    author: string;
    rating: number;
    text: string;
    business: string;
    businessType: string;
    city: string;
  };
}

export function AIReplyDialog({ open, onOpenChange, review }: AIReplyDialogProps) {
  const [tone, setTone] = useState("PROFESIONAL");
  const [variants, setVariants] = useState<string[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [customText, setCustomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const { toast } = useToast();

  const generateReply = useCallback(async (rewriteAction?: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: review.id,
          reviewText: review.text,
          rating: review.rating,
          authorName: review.author,
          businessName: review.business,
          businessType: review.businessType,
          city: review.city,
          tone,
          rewriteAction,
          currentText: selectedVariant !== null ? variants[selectedVariant] : undefined,
        }),
      });

      const data = await response.json();

      if (data.variants) {
        setVariants(data.variants);
        setSelectedVariant(0);
        setCustomText(data.variants[0]);
      }
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera răspunsul. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [tone, review, selectedVariant, variants, toast]);

  const handleSelectVariant = (index: number) => {
    setSelectedVariant(index);
    setCustomText(variants[index]);
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePublish = async () => {
    if (!customText.trim()) return;
    setPublishing(true);
    try {
      await fetch("/api/reviews/publish-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: review.id,
          replyText: customText,
          tone,
        }),
      });
      toast({
        title: "✅ Publicat pe Google!",
        description: "Răspunsul a fost trimis cu succes pe Google Business.",
      });
      onOpenChange(false);
    } catch {
      toast({
        title: "Eroare publicare",
        description: "Nu s-a putut publica. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/50 bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-500/10">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
            AI Reply Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Review preview */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">{review.author}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < review.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {review.text}
            </p>
          </div>

          {/* Tone selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-12 flex-shrink-0">Ton:</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="flex-1 border-border/50 bg-card/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tones.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    <div className="flex items-center gap-2">
                      <t.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      {t.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => generateReply()}
              disabled={loading}
              className="bg-brand-500 hover:bg-brand-600 text-white border-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span className="ml-2">
                {variants.length > 0 ? "Regenerează" : "Generează"}
              </span>
            </Button>
          </div>

          {/* Generated variants */}
          <AnimatePresence>
            {variants.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  Alege o variantă:
                </p>
                {variants.map((variant, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleSelectVariant(i)}
                    className={cn(
                      "relative p-4 rounded-xl border cursor-pointer transition-all",
                      selectedVariant === i
                        ? "border-brand-500/50 bg-brand-500/5"
                        : "border-border/30 hover:border-brand-500/30 hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={cn(
                            "text-xs",
                            selectedVariant === i
                              ? "bg-brand-500/20 text-brand-400 border-brand-500/30"
                              : "bg-muted/50 text-muted-foreground border-0"
                          )}
                        >
                          Varianta {i + 1}
                        </Badge>
                        {selectedVariant === i && (
                          <Badge className="bg-brand-500 text-white border-0 text-xs">
                            Selectată
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(variant, i);
                        }}
                      >
                        {copied === i ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed">{variant}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Rewrite options */}
          {variants.length > 0 && selectedVariant !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <p className="text-xs font-medium text-muted-foreground">
                Rescrie varianta selectată:
              </p>
              <div className="flex flex-wrap gap-2">
                {rewriteOptions.map((opt) => (
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium">Editează răspunsul:</label>
              <Textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Editează sau scrie propriul răspuns..."
                className="min-h-[100px] border-border/50 bg-card/50 resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {customText.length} caractere · ~{Math.ceil(customText.split(" ").length)} cuvinte
                </span>
                <span className="text-xs text-muted-foreground">
                  {customText.length > 600 && "⚠️ Prea lung pentru Google"}
                </span>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border/50"
            >
              Anulează
            </Button>
            <Button
              onClick={handlePublish}
              disabled={!customText.trim() || publishing}
              className="flex-1 bg-brand-500 hover:bg-brand-600 text-white border-0"
            >
              {publishing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Publică pe Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
