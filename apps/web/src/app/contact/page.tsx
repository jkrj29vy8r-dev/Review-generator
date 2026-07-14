import { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-muted-foreground mb-8">Suntem aici să te ajutăm. Răspundem în maxim 24h.</p>
        <div className="grid gap-4 text-sm">
          <div className="rounded-2xl border border-border/40 bg-card/40 glass p-5">
            <p className="font-medium mb-1">Email suport</p>
            <a href="mailto:contact@aireviewmanager.ro" className="text-brand-400 hover:underline">contact@aireviewmanager.ro</a>
          </div>
          <div className="rounded-2xl border border-border/40 bg-card/40 glass p-5">
            <p className="font-medium mb-1">Program suport</p>
            <p className="text-muted-foreground">Luni – Vineri, 09:00 – 18:00 EET</p>
          </div>
        </div>
      </div>
    </div>
  );
}
