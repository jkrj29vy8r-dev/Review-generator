import { SignUp } from "@clerk/nextjs";
import { Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  "30 răspunsuri AI gratuite/lună",
  "Conectare Google Business în 2 minute",
  "Fără card bancar necesar",
  "Cancel oricând",
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-900 via-brand-900 to-brand-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]" />
        </div>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-white text-xl">AI Review Manager</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Începe gratuit azi
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Alătură-te a peste 1,200 de afaceri care economisesc timp cu AI.
          </p>
          <ul className="space-y-3">
            {benefits.map(b => (
              <li key={b} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            &ldquo;Setup în 5 minute. Prima recenzie răspunsă automat în 10 minute.
            Incredibil de ușor de folosit!&rdquo;
          </p>
          <p className="text-white/50 text-xs mt-2">— Elena D., Director Clinică Dentară</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-lg">AI Review Manager</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Creează cont gratuit</h1>
            <p className="text-muted-foreground">
              30 răspunsuri AI incluse. Fără card bancar.
            </p>
          </div>
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border border-border bg-card hover:bg-muted text-foreground",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",
                formFieldInput:
                  "border-border bg-card text-foreground focus:ring-brand-500",
                formButtonPrimary:
                  "bg-brand-500 hover:bg-brand-600 text-white",
                footerActionLink: "text-brand-400 hover:text-brand-300",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
