"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Ceva nu a mers bine</h1>
        <p className="text-muted-foreground mb-8">
          A apărut o eroare neașteptată. Încearcă din nou.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Încearcă din nou
        </button>
      </div>
    </div>
  );
}
