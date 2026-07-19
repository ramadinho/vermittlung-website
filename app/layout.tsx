import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Concivo — Ihr persönlicher Hausmanager",
  description:
    "Beschreiben Sie Ihr Anliegen rund um Haus, Wohnung oder Liegenschaft — wir kümmern uns um den Rest. Ein Ansprechpartner. Vollständige Lösung.",
  keywords: [
    "Hausmanager",
    "Immobilienservice",
    "Hausverwaltung",
    "Handwerker",
    "Liegenschaft",
    "property management",
    "concierge service",
  ],
  openGraph: {
    title: "Concivo — Ihr persönlicher Hausmanager",
    description:
      "Ein Ansprechpartner für alles rund um Ihre Immobilie. Wir organisieren, koordinieren und lösen.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geist.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="font-[family-name:var(--font-geist)] antialiased">
        {children}
      </body>
    </html>
  );
}
