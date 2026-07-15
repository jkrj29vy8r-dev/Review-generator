"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BUSINESS_TYPES = [
  "Restaurant",
  "Hotel",
  "Cafe",
  "Bar",
  "Spa",
  "Salon",
  "Clinică",
  "Farmacie",
  "Gym",
  "Auto",
  "Magazin",
  "Altele",
];

export default function NewBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    phone: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.city) {
      setError("Completează câmpurile obligatorii: Nume, Tip, Oraș.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la creare");
      router.push("/businesses");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/businesses"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Înapoi la afaceri
        </Link>

        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Adaugă o afacere nouă</h1>
          <p className="text-muted-foreground text-sm">
            Completează detaliile afacerii. Ulterior o conectezi cu Google Business.
          </p>
        </div>

        <Card className="border-border/40 bg-card/40 glass">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Numele afacerii <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="ex: Restaurant La Mama"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-border/50 bg-card/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  Tipul afacerii <span className="text-rose-400">*</span>
                </Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="border-border/50 bg-card/50">
                    <SelectValue placeholder="Selectează tipul" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  Orașul <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="ex: București"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="border-border/50 bg-card/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresa</Label>
                <Input
                  id="address"
                  placeholder="ex: Str. Florilor 12, Sector 1"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="border-border/50 bg-card/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    placeholder="0721 000 000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border-border/50 bg-card/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="www.site.ro"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="border-border/50 bg-card/50"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <Button asChild variant="outline" className="flex-1 border-border/50">
                  <Link href="/businesses">Anulează</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-brand-500 to-violet-500 hover:opacity-90 text-white border-0"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Building2 className="w-4 h-4 mr-2" />
                  )}
                  {loading ? "Se creează..." : "Creează afacerea"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
