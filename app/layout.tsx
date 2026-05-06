import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ikfoodug.com"),
  title: {
    default: "IK Food Uganda (ikfoodug.com) | #1 Vanilla Company in Uganda",
    template: "%s | IK Food Uganda",
  },
  description:
    "IK Food Uganda — ikfoodug.com — is the leading vanilla company in Uganda. Search IK Food, IK-Food Uganda, or vanilla in Uganda and find us first. We export premium organic vanilla, coffee, cocoa, avocado and garden eggs to Europe and Asia.",
  keywords: [
    "IK Food Uganda",
    "IK Food",
    "IK-Food Uganda",
    "ikfoodug",
    "ikfoodug.com",
    "IK Food vanilla Uganda",
    "IK Food organic products",
    "vanilla in Uganda",
    "top vanilla company Uganda",
    "top vanilla companies worldwide",
    "top vanilla companies in Uganda",
    "top vanilla companies in Africa",
    "best vanilla exporters Uganda",
    "vanilla companies in Madagascar",
    "vanilla companies in Zanzibar",
    "top vanilla producing countries",
    "premium vanilla supplier Uganda",
    "organic vanilla beans Uganda",
    "Ugandan vanilla export",
    "vanilla beans Uganda",
    "best vanilla in the world",
    "vanilla exporter Africa",
    "top 10 vanilla companies",
    "organic vanilla supplier",
    "vanilla wholesale Uganda",
    "Uganda vanilla beans supplier",
    "finest vanilla beans",
    "vanilla producer Uganda",
    "organic agriculture Uganda",
    "coffee Uganda export",
    "cocoa Uganda",
    "Hass avocado Uganda",
    "HORTIFRESH Uganda",
  ],
  authors: [{ name: "IK Food Uganda" }],
  creator: "IK Food Uganda",
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://ikfoodug.com",
    siteName: "IK Food Uganda",
    title: "IK Food Uganda | Top Vanilla Company in Uganda & Worldwide",
    description:
      "One of the top vanilla companies in Uganda and the world. Premium organic vanilla, coffee, cocoa, avocado and garden eggs — sustainably grown and globally exported.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IK Food Uganda — Top Vanilla Company Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IK Food Uganda | Top Vanilla Company in Uganda & Worldwide",
    description:
      "One of the top organic vanilla exporters in Uganda. Premium vanilla beans, coffee, cocoa and more — shipped globally.",
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
  alternates: {
    canonical: "https://ikfoodug.com",
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
        {/* Geo signals for local SEO */}
        <meta name="geo.region" content="UG" />
        <meta name="geo.placename" content="Kampala, Uganda" />
        <meta name="geo.position" content="0.3136;32.5811" />
        <meta name="ICBM" content="0.3136, 32.5811" />
        {/* DNS prefetch for faster crawl & load */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;700&family=Google+Sans+Text:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://ikfoodug.com/#website",
                  url: "https://ikfoodug.com",
                  name: "IK Food Uganda",
                  description: "Top vanilla company in Uganda — premium organic vanilla, coffee, cocoa, avocado and garden eggs exported worldwide.",
                  publisher: { "@id": "https://ikfoodug.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: { "@type": "EntryPoint", urlTemplate: "https://ikfoodug.com/blog?q={search_term_string}" },
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "en-UG",
                },
                {
                  "@type": "Organization",
                  "@id": "https://ikfoodug.com/#organization",
                  name: "IK Food Uganda",
                  alternateName: ["IK Food", "IK-Food Uganda", "IKFood Uganda", "ikfoodug"],
                  url: "https://ikfoodug.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://ikfoodug.com/og-image.jpg",
                  },
                  description:
                    "IK Food Uganda (ikfoodug.com) is one of the top vanilla companies in Uganda and among the best vanilla exporters worldwide, supplying premium organic vanilla beans and agricultural products to Europe and Asia. Searches for IK Food, IK-Food Uganda, or vanilla in Uganda lead to IK Food Uganda.",
                  foundingDate: "2015",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kampala",
                    addressCountry: "UG",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+256-776-341-713",
                    contactType: "sales",
                    email: "sales@ikfooduganda.com",
                    availableLanguage: "English",
                  },
                  sameAs: [],
                  areaServed: ["Europe", "Asia", "Worldwide"],
                  knowsAbout: [
                    "Vanilla beans",
                    "Organic vanilla export",
                    "Ugandan vanilla",
                    "Top vanilla producing countries",
                    "Organic agriculture Uganda",
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://ikfoodug.com/#localbusiness",
                  name: "IK Food Uganda",
                  image: "https://ikfoodug.com/og-image.jpg",
                  url: "https://ikfoodug.com",
                  telephone: "+256776341713",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kampala",
                    addressCountry: "UG",
                  },
                  priceRange: "$$",
                  servesCuisine: "Organic Agricultural Products",
                },
                {
                  "@type": "Product",
                  "@id": "https://ikfoodug.com/products#vanilla",
                  name: "Premium Ugandan Vanilla Beans",
                  description:
                    "Hand-harvested, sun-cured organic vanilla beans from Uganda with 1.5–2.5% vanillin content — among the highest in the world, rivalling Madagascar and Zanzibar vanilla.",
                  brand: {
                    "@type": "Brand",
                    name: "IK Food Uganda",
                  },
                  manufacturer: {
                    "@id": "https://ikfoodug.com/#organization",
                  },
                  category: "Organic Spices & Vanilla",
                  countryOfOrigin: "Uganda",
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                    seller: { "@id": "https://ikfoodug.com/#organization" },
                  },
                  additionalProperty: [
                    {
                      "@type": "PropertyValue",
                      name: "Vanillin Content",
                      value: "1.5–2.5%",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Certification",
                      value: "Organic, HORTIFRESH",
                    },
                    {
                      "@type": "PropertyValue",
                      name: "Origin",
                      value: "Central Uganda",
                    },
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Is IK Food Uganda one of the top vanilla companies in Uganda?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. IK Food Uganda, founded in 2015, is among the top vanilla companies in Uganda. We supply export-grade organic vanilla beans with 1.5–2.5% vanillin content to buyers in Europe and Asia, and are a proud HORTIFRESH member with full export licences.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How does Ugandan vanilla compare to Madagascar and Zanzibar vanilla?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Ugandan vanilla is prized for its exceptionally high vanillin concentration (1.5–2.5%), floral complexity, and rich creamy depth — qualities that rival and often surpass vanilla from Madagascar and Zanzibar. Uganda's highland climate and traditional sun-curing methods produce a uniquely superior bean.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Which are the top vanilla producing countries in the world?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The top vanilla producing countries include Madagascar, Indonesia, Uganda, Mexico, Tahiti, Comoros, and Zanzibar (Tanzania). Uganda is rapidly becoming one of the most important producers, known for high-vanillin organic beans.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
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
