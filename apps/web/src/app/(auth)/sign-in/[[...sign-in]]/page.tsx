import { SignIn } from "@clerk/nextjs";
import { Star } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]" />
        </div>

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-white text-xl">AI Review Manager</span>
        </Link>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-white/90 text-xl leading-relaxed font-medium">
              &ldquo;De când folosim AI Review Manager, rata noastră de răspuns a
              crescut de la 40% la 94%. Economisim 3 ore pe săptămână.&rdquo;
            </p>
            <footer className="text-white/60 text-sm">
              — Andrei M., Manager Restaurant La Bunica, București
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { label: "Răspunsuri generate", value: "2.4M+" },
            { label: "Rating mediu crescut", value: "+0.8★" },
          ].map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
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
            <h1 className="text-2xl font-bold mb-2">Bun venit înapoi</h1>
            <p className="text-muted-foreground">
              Autentifică-te în contul tău
            </p>
          </div>
          <SignIn
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
