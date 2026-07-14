import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n/context";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AI Review Manager — Răspunzuri inteligente la recenzii Google",
    template: "%s | AI Review Manager",
  },
  description:
    "Platformă AI premium pentru gestionarea și răspunderea automată la recenziile Google Business. Economisești timp, îmbunătățești ratingul.",
  keywords: ["AI", "recenzii Google", "review manager", "răspuns automat", "Google Business"],
  authors: [{ name: "AI Review Manager" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://aireviewmanager.ro"
  ),
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "/",
    siteName: "AI Review Manager",
    title: "AI Review Manager — Răspunzuri inteligente la recenzii Google",
    description: "Platformă AI premium pentru gestionarea recenziilor Google",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Review Manager",
    description: "Platformă AI premium pentru gestionarea recenziilor Google",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ro" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <I18nProvider>
              <SmoothScroll>
                {children}
              </SmoothScroll>
              <Toaster />
            </I18nProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
