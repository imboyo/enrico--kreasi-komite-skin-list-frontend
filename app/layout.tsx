import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import ReactQueryProvider from "@/components/provider/QueryClient";
import "./globals.css";

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
    <html lang="id" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
    </html>
  );
}
