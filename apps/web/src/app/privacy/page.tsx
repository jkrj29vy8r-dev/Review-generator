import { Metadata } from "next";

export const metadata: Metadata = { title: "Politica de Confidențialitate" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Politica de Confidențialitate</h1>
        <p className="text-muted-foreground mb-8">Ultima actualizare: Iulie 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Date colectate</h2>
            <p>Colectăm datele de cont (email, nume) prin Clerk Authentication, datele afacerilor conectate prin Google Business Profile API și recenziile Google asociate acestora. Nu colectăm date de plată — acestea sunt gestionate de Stripe.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Utilizarea datelor</h2>
            <p>Datele sunt utilizate exclusiv pentru a genera răspunsuri AI la recenzii și pentru a furniza statistici despre afacerile tale. Nu vindem date terților.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Stocare</h2>
            <p>Datele sunt stocate în Supabase (PostgreSQL) pe servere AWS eu-west-1 (Irlanda), respectând GDPR.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Drepturile tale</h2>
            <p>Ai dreptul la acces, rectificare și ștergere a datelor. Contactează-ne la contact@aireviewmanager.ro pentru orice solicitare.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Cookie-uri</h2>
            <p>Folosim cookie-uri strict necesare pentru autentificare (Clerk) și preferințe de limbă. Nu folosim cookie-uri de tracking terță.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
