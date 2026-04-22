// Root layout — sets global fonts, SEO metadata, and HTML shell for all pages.
// MobileContainer is here so the sidebar overlay is always constrained inside the 500px shell.
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://skinlist.kreasikomite.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Skin List - Kreasi Komite",
    template: "%s | Skin List - Kreasi Komite",
  },
  description:
    "Platform untuk pengguna dan klinik kecantikan melacak perawatan kulit secara digital. Pantau routing, makeup, skin barrier, warna kulit, dan konsultasi online dengan klinik sebelum kunjungan.",
  keywords: [
    "skin list",
    "kreasi komite",
    "perawatan kulit",
    "klinik kecantikan",
    "konsultasi kulit online",
    "skin care tracker",
    "skin barrier",
    "makeup consultation",
  ],
  authors: [{ name: "Kreasi Komite" }],
  creator: "Kreasi Komite",
  publisher: "Kreasi Komite",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Skin List - Kreasi Komite",
    title: "Skin List - Kreasi Komite",
    description:
      "Platform untuk pengguna dan klinik kecantikan melacak perawatan kulit secara digital. Konsultasi online dengan klinik sebelum kunjungan.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Skin List - Kreasi Komite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin List - Kreasi Komite",
    description:
      "Platform untuk pengguna dan klinik kecantikan melacak perawatan kulit secara digital. Konsultasi online dengan klinik sebelum kunjungan.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
