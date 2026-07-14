import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold bg-gradient-to-r from-brand-500 to-violet-500 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold mb-2">Pagina nu există</h1>
        <p className="text-muted-foreground mb-8">
          Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Mergi la Dashboard
        </Link>
      </div>
    </div>
  );
}
