import { Metadata } from "next";

export const metadata: Metadata = { title: "Termeni și Condiții" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Termeni și Condiții</h1>
        <p className="text-muted-foreground mb-8">Ultima actualizare: Iulie 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Serviciul</h2>
            <p>AI Review Manager oferă o platformă SaaS pentru gestionarea și răspunderea automată la recenziile Google Business, utilizând tehnologie AI (GPT-4o).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Abonamente</h2>
            <p>Planul Free oferă 30 de răspunsuri AI/lună. Planurile Pro (€19/lună) și Business (€49/lună) oferă acces nelimitat. Facturarea este lunară, anulabilă oricând.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Utilizare acceptabilă</h2>
            <p>Nu este permisă utilizarea platformei pentru a genera răspunsuri înșelătoare, spam sau conținut care încalcă Termenii Google Business Profile.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Limitarea răspunderii</h2>
            <p>Răspunsurile generate de AI sunt sugestii. Utilizatorul este responsabil pentru conținutul publicat pe Google. AI Review Manager nu garantează rezultate specifice în rating sau recenzii.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Contact</h2>
            <p>Pentru orice întrebări: contact@aireviewmanager.ro</p>
          </section>
        </div>
      </div>
    </div>
  );
}
