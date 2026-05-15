import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import ReactQueryProvider from "@/components/provider/QueryClient";
import NavigationProgressProvider from "@/components/provider/NavigationProgress";
import { ToastProvider } from "@/components/provider/Toast";
import PWARegistrationProvider from "@/components/provider/PWARegistration";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://skinlist.kreasikomite.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "Skin List - Kreasi Komite",
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
  manifest: "/manifest.webmanifest",
  icons: {
    // Keep each icon size explicit so browsers and install surfaces can pick the closest asset.
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
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

export const viewport: Viewport = {
  themeColor: "#363536",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <ToastProvider defaultPosition="bottom-right">
            <NavigationProgressProvider />
            <PWARegistrationProvider />
            {children}
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
