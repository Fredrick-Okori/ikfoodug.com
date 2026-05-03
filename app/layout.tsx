import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ik-fooduganda.com"),
  title: {
    default: "IK Food Uganda | Premium Organic Agricultural Products",
    template: "%s | IK Food Uganda",
  },
  description:
    "IK Food Uganda delivers premium organic agricultural products — vanilla, coffee, cocoa, avocado, and garden eggs — grown sustainably and exported globally from the heart of Uganda.",
  keywords: [
    "IK Food Uganda",
    "Ugandan vanilla",
    "organic agriculture Uganda",
    "vanilla export Uganda",
    "Hass avocado Uganda",
    "coffee Uganda",
    "cocoa Uganda",
    "organic farming Uganda",
    "premium agricultural products",
    "Uganda exports",
  ],
  authors: [{ name: "IK Food Uganda" }],
  creator: "IK Food Uganda",
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://ik-fooduganda.com",
    siteName: "IK Food Uganda",
    title: "IK Food Uganda | Pure Ugandan Vanilla, Perfected for the World",
    description:
      "Premium organic agricultural products from Uganda — vanilla, coffee, cocoa, avocado, and garden eggs. Sustainably grown, globally exported.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IK Food Uganda — Premium Organic Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IK Food Uganda | Premium Organic Agricultural Products",
    description:
      "Pure Ugandan vanilla and organic agricultural products, perfected for the world.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;700&family=Google+Sans+Text:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
