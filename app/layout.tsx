import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ateliê Terra — Produtos Artesanais",
    template: "%s | Ateliê Terra",
  },
  description:
    "Produtos artesanais feitos à mão com materiais naturais. Cerâmica, macramê, velas e muito mais. Entrega para todo o Brasil.",
  keywords: [
    "artesanato",
    "produtos artesanais",
    "cerâmica",
    "macramê",
    "velas artesanais",
    "decoração boho",
  ],
  metadataBase: new URL("https://atelieterra.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://atelieterra.vercel.app",
    siteName: "Ateliê Terra",
    title: "Ateliê Terra — Produtos Artesanais",
    description:
      "Produtos artesanais feitos à mão com materiais naturais.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ateliê Terra — Produtos Artesanais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateliê Terra — Produtos Artesanais",
    description:
      "Produtos artesanais feitos à mão com materiais naturais.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Ateliê Terra",
  description: "Produtos artesanais feitos à mão com materiais naturais",
  url: "https://atelieterra.vercel.app",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Itajaí",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  priceRange: "R$22 - R$149",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
