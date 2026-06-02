import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ikfoodug.com"),
  title: {
    default: "IK Food Uganda (ikfoodug.com) | #1 Vanilla Company in Uganda",
    template: "%s | IK Food Uganda",
  },
  description:
    "IK Food Uganda (ikfoodug.com) is the #1 vanilla company in Uganda, founded 2015, Kampala. We export premium natural vanilla beans to Europe and Asia. Contact: +256 776 341 713.",
  keywords: [
    "IK Food Uganda", "IK Food", "IK-Food Uganda", "IK Food Ltd", "IK Food (U) Ltd",
    "IK Food Limited Uganda", "IK Food Ltd Uganda", "ikfoodug", "ikfoodug.com",
    "IK Food vanilla Uganda", "IK Food natural products", "vanilla in Uganda",
    "top vanilla company Uganda", "number one vanilla company Uganda",
    "best vanilla company in Uganda", "Uganda vanilla supplier",
    "top vanilla companies worldwide", "top vanilla companies in Uganda",
    "top vanilla exporters in Uganda", "vanilla exporters in Uganda",
    "Uganda vanilla exporters", "leading vanilla exporter Uganda",
    "top vanilla companies in Africa", "best vanilla exporters Uganda",
    "vanilla companies in Madagascar", "vanilla companies in Zanzibar",
    "top vanilla producing countries", "premium vanilla supplier Uganda",
    "natural vanilla beans Uganda", "Ugandan vanilla export",
    "vanilla beans Uganda", "best vanilla in the world",
    "vanilla exporter Africa", "top 10 vanilla companies", "natural vanilla supplier",
    "vanilla wholesale Uganda", "Uganda vanilla beans supplier", "finest vanilla beans",
    "vanilla producer Uganda", "natural agriculture Uganda",
    "buy vanilla beans Uganda", "vanilla beans Kampala", "Uganda vanilla export company",
    "natural vanilla exporter Uganda", "vanilla company Kampala Uganda",
    "vanilla supplier East Africa", "grade A vanilla beans Uganda",
    "vanilla powder Uganda", "vanilla paste Uganda", "vanilla caviar Uganda",
  ],
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/favicon-32x32.png" }],
  },
  authors: [{ name: "IK Food Uganda", url: "https://ikfoodug.com" }],
  creator: "IK Food Uganda",
  publisher: "IK Food Uganda",
  category: "Agriculture, Natural Food Export, Vanilla",
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://ikfoodug.com",
    siteName: "IK Food Uganda",
    title: "IK Food Uganda | #1 Vanilla Company in Uganda — ikfoodug.com",
    description:
      "IK Food Uganda is the leading natural vanilla exporter in Uganda, founded 2015. Premium Grade A & B vanilla beans, paste, powder, caviar. Exporting to Europe & Asia. Call +256 776 341 713.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IK Food Uganda — #1 Vanilla Company Uganda" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IK Food Uganda | #1 Vanilla Company in Uganda",
    description: "Uganda's top natural vanilla exporter. Premium vanilla beans shipped to Europe & Asia.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://ikfoodug.com" },
  other: {
    "rating": "general",
    "language": "English",
    "revisit-after": "7 days",
    "coverage": "Uganda, East Africa, Worldwide",
    "distribution": "global",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
        <meta name="geo.region" content="UG" />
        <meta name="geo.placename" content="Kampala, Uganda" />
        <meta name="geo.position" content="0.3136;32.5811" />
        <meta name="ICBM" content="0.3136, 32.5811" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="H84fQYdc4Ja0oRH7pCj-SbApyKZs1SKkkLgonwbDqsQ" />
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
                  alternateName: "ikfoodug.com",
                  description: "#1 vanilla company in Uganda, founded 2015 in Kampala. Premium vanilla beans exported to Europe and Asia.",
                  publisher: { "@id": "https://ikfoodug.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: { "@type": "EntryPoint", urlTemplate: "https://ikfoodug.com/blog?q={search_term_string}" },
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "en-UG",
                  speakable: {
                    "@type": "SpeakableSpecification",
                    cssSelector: ["h1", "h2", ".section-eyebrow", "[data-speakable]"],
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://ikfoodug.com/#organization",
                  name: "IK Food Uganda",
                  legalName: "IK Food (U) Ltd",
                  alternateName: ["IK Food", "IK-Food Uganda", "IKFood Uganda", "ikfoodug", "IK Food (U) Ltd"],
                  url: "https://ikfoodug.com",
                  logo: {
                    "@type": "ImageObject",
                    "@id": "https://ikfoodug.com/#logo",
                    url: "https://ikfoodug.com/logo_clean.webp",
                    contentUrl: "https://ikfoodug.com/logo_clean.webp",
                    caption: "IK Food Uganda logo",
                  },
                  image: "https://ikfoodug.com/og-image.jpg",
                  description: "IK Food Uganda (ikfoodug.com) is the #1 vanilla company in Uganda and one of the leading natural vanilla exporters in Africa. Founded in 2015 in Kampala, we supply export-grade Grade A and Grade B vanilla beans, vanilla powder, paste, caviar, and green beans with 1.5–2.5% vanillin content to buyers in Europe and Asia.",
                  foundingDate: "2015",
                  foundingLocation: { "@type": "Place", name: "Kampala, Uganda", address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" } },
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kampala",
                    addressRegion: "Central Region",
                    addressCountry: "UG",
                    addressCountryName: "Uganda",
                  },
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+256-776-341-713",
                      contactType: "sales",
                      email: "sales@ikfooduganda.com",
                      availableLanguage: ["English"],
                      areaServed: "Worldwide",
                      hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
                    },
                  ],
                  sameAs: [
                    "https://ikfoodug.com",
                  ],
                  areaServed: [
                    { "@type": "Country", name: "Uganda" },
                    { "@type": "Country", name: "United Kingdom" },
                    { "@type": "Country", name: "Germany" },
                    { "@type": "Country", name: "Netherlands" },
                    { "@type": "Country", name: "France" },
                    { "@type": "Country", name: "Japan" },
                    { "@type": "Country", name: "South Korea" },
                  ],
                  knowsAbout: [
                    "Vanilla beans Uganda",
                    "Natural vanilla export",
                    "Ugandan vanilla",
                    "Grade A vanilla beans",
                    "Grade B vanilla beans",
                    "Top vanilla producing countries",
                    "Natural agriculture Uganda",
                    "Vanilla vs Madagascar",
                    "Vanilla bean export certification",
                  ],
                  hasCredential: [
                    { "@type": "EducationalOccupationalCredential", name: "Phytosanitary Export Licence", credentialCategory: "Export Clearance" },
                  ],
                  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://ikfoodug.com/#localbusiness",
                  name: "IK Food Uganda",
                  legalName: "IK Food (U) Ltd",
                  description: "IK Food Uganda is the number one vanilla company in Uganda, based in Kampala. We export premium natural vanilla beans to Europe and Asia.",
                  image: "https://ikfoodug.com/og-image.jpg",
                  url: "https://ikfoodug.com",
                  telephone: "+256776341713",
                  email: "sales@ikfooduganda.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kampala",
                    addressRegion: "Central Region",
                    addressCountry: "UG",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 0.3136,
                    longitude: 32.5811,
                  },
                  openingHoursSpecification: [
                    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
                  ],
                  priceRange: "$$",
                  currenciesAccepted: "USD, EUR, UGX",
                  paymentAccepted: "Bank Transfer, Letter of Credit",
                  areaServed: "Worldwide",
                  hasMap: "https://maps.google.com/?q=Kampala,Uganda",
                },
                {
                  "@type": "Product",
                  "@id": "https://ikfoodug.com/products#vanilla",
                  name: "Premium Ugandan Vanilla Beans",
                  description: "Hand-harvested, sun-cured natural vanilla beans from Uganda with 1.5–2.5% vanillin content — among the highest in the world. Available as Grade A, Grade B, Split Beans, Powder, Paste, Caviar, and Green Beans.",
                  brand: { "@type": "Brand", name: "IK Food Uganda" },
                  manufacturer: { "@id": "https://ikfoodug.com/#organization" },
                  category: "Natural Spices & Vanilla",
                  countryOfOrigin: "Uganda",
                  offers: { "@type": "Offer", priceCurrency: "USD", availability: "https://schema.org/InStock", seller: { "@id": "https://ikfoodug.com/#organization" } },
                  additionalProperty: [
                    { "@type": "PropertyValue", name: "Vanillin Content", value: "1.5–2.5%" },
                    { "@type": "PropertyValue", name: "Certification", value: "Export Grade" },
                    { "@type": "PropertyValue", name: "Origin", value: "Central Uganda" },
                    { "@type": "PropertyValue", name: "Moisture Content Grade A", value: "30–35%" },
                    { "@type": "PropertyValue", name: "Pod Length Grade A", value: "15–20 cm" },
                    { "@type": "PropertyValue", name: "Harvest Method", value: "Hand-harvested at peak maturity" },
                    { "@type": "PropertyValue", name: "Curing Method", value: "Traditional sun-curing, 6 months" },
                  ],
                },
                {
                  "@type": "ItemList",
                  "@id": "https://ikfoodug.com/products#list",
                  name: "IK Food Uganda — Complete Vanilla Products Catalogue",
                  description: "All 7 premium natural vanilla products exported by IK Food Uganda — Uganda's #1 vanilla company",
                  numberOfItems: 7,
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Grade A Vanilla Beans", url: "https://ikfoodug.com/products#grade-a", item: { "@type": "Product", name: "Grade A Vanilla Beans", description: "Long, plump, premium export-grade vanilla beans (15–20 cm) with 1.5–2.5% vanillin content from Central Uganda.", offers: { "@type": "Offer", availability: "https://schema.org/InStock" } } },
                    { "@type": "ListItem", position: 2, name: "Grade B Vanilla Beans", url: "https://ikfoodug.com/products#grade-b", item: { "@type": "Product", name: "Grade B Vanilla Beans", description: "Extraction-grade natural vanilla beans (<15 cm) with concentrated vanillin profile, ideal for vanilla extract manufacturing." } },
                    { "@type": "ListItem", position: 3, name: "Vanilla Powder", url: "https://ikfoodug.com/products#vanilla-powder", item: { "@type": "Product", name: "Vanilla Powder", description: "100% pure ground Ugandan vanilla beans, no additives, ≤3% moisture." } },
                    { "@type": "ListItem", position: 4, name: "Split Vanilla Beans", url: "https://ikfoodug.com/products#split-beans", item: { "@type": "Product", name: "Split Vanilla Beans", description: "Hand-split lengthwise vanilla pods for fast flavour extraction, 18–25% moisture." } },
                    { "@type": "ListItem", position: 5, name: "Vanilla Paste", url: "https://ikfoodug.com/products#vanilla-paste", item: { "@type": "Product", name: "Vanilla Paste", description: "Bean-specked ready-to-use vanilla paste combining extract flavour with real vanilla seeds. 1 tsp = 1 whole pod." } },
                    { "@type": "ListItem", position: 6, name: "Vanilla Caviar", url: "https://ikfoodug.com/products#vanilla-caviar", item: { "@type": "Product", name: "Vanilla Caviar", description: "100% pure vanilla bean seeds scraped from Grade A Ugandan pods — intensely concentrated flavour, no additives." } },
                    { "@type": "ListItem", position: 7, name: "Vanilla Green Beans", url: "https://ikfoodug.com/products#vanilla-green-beans", item: { "@type": "Product", name: "Vanilla Green Beans", description: "Freshly harvested pre-cure vanilla pods straight from Uganda's highland farms — high raw vanillin potential." } },
                  ],
                },
                {
                  "@type": "HowTo",
                  "@id": "https://ikfoodug.com/#howto-export",
                  "name": "How IK Food Uganda Exports Vanilla from Uganda",
                  "description": "The 4-step farm-to-shipment process IK Food Uganda uses to produce and export premium natural vanilla beans",
                  "step": [
                    { "@type": "HowToStep", position: 1, name: "Cultivation", text: "Natural seeds, biodynamic soil preparation, and shade-grown techniques on Uganda's highland farms. All farming is pesticide-free." },
                    { "@type": "HowToStep", position: 2, name: "Harvest", text: "Vanilla pods are hand-picked at peak maturity by trained smallholder farmers — over 3,000 partner farmers across Central Uganda." },
                    { "@type": "HowToStep", position: 3, name: "Processing", text: "On-site quality testing, 6-month traditional sun-curing, grading, and cold-chain packing to EU export specifications." },
                    { "@type": "HowToStep", position: 4, name: "Export", text: "Full phytosanitary certification documentation and direct dispatch to buyers in Europe (UK, Germany, Netherlands, France) and Asia (Japan, South Korea)." },
                  ],
                },
                {
                  "@type": "Person",
                  "@id": "https://ikfoodug.com/about#israel-kaweesa",
                  name: "Israel Kaweesa",
                  jobTitle: "General Manager",
                  description: "Israel Kaweesa is the General Manager of IK Food Uganda. With over a decade of agribusiness experience, he has built IK Food Uganda into a trusted global natural vanilla exporter.",
                  worksFor: { "@id": "https://ikfoodug.com/#organization" },
                  knowsAbout: ["Natural vanilla export Uganda", "Agricultural trade East Africa", "Vanilla bean cultivation Uganda"],
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://ikfoodug.com/#faqpage",
                  mainEntity: [
                    { "@type": "Question", name: "What is IK Food Uganda?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda (website: ikfoodug.com) is the #1 vanilla company in Uganda, founded in 2015 and headquartered in Kampala. We are a certified natural vanilla exporter supplying premium vanilla beans to buyers in Europe and Asia." } },
                    { "@type": "Question", name: "Is IK Food Uganda one of the top vanilla exporters in Uganda?", acceptedAnswer: { "@type": "Answer", text: "Yes. IK Food Uganda is recognised as one of the top vanilla exporters in Uganda. Founded in 2015 in Kampala, it supplies export-grade natural vanilla beans with 1.5–2.5% vanillin content to buyers in Europe and Asia, with full phytosanitary export licences." } },
                    { "@type": "Question", name: "How does Ugandan vanilla compare to Madagascar and Zanzibar vanilla?", acceptedAnswer: { "@type": "Answer", text: "Ugandan vanilla from IK Food Uganda is prized for its exceptionally high vanillin concentration (1.5–2.5%), floral complexity, and rich creamy depth — qualities that rival and often surpass vanilla from Madagascar (1.5–2.0% vanillin) and Zanzibar. Uganda's highland climate and traditional 6-month sun-curing produce a uniquely complex flavour profile." } },
                    { "@type": "Question", name: "Which are the top vanilla producing countries in the world?", acceptedAnswer: { "@type": "Answer", text: "The top vanilla producing countries include Madagascar (largest producer), Indonesia, Uganda, Mexico, Tahiti, Comoros, and Zanzibar (Tanzania). Uganda is one of the fastest-growing producers, known for high-vanillin natural beans with exceptional quality." } },
                    { "@type": "Question", name: "What products does IK Food Uganda export?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda exports 7 premium vanilla products: Grade A Vanilla Beans, Grade B Vanilla Beans, Vanilla Powder, Split Vanilla Beans, Vanilla Paste, Vanilla Caviar, and Vanilla Green Beans." } },
                    { "@type": "Question", name: "Where is IK Food Uganda based?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda is based in Kampala, Uganda — the capital city. The company works with 3,000+ smallholder farmers across Central Uganda's highland growing regions." } },
                    { "@type": "Question", name: "What certifications does IK Food Uganda have?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda holds full phytosanitary export licences for international shipment. All products meet EU and international natural standards with complete farm-to-shipment traceability." } },
                    { "@type": "Question", name: "What is the vanillin content of Ugandan vanilla beans?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda's vanilla beans contain 1.5–2.5% vanillin, which is among the highest in the world. This high vanillin concentration, achieved through traditional 6-month sun-curing and Uganda's ideal highland climate, is what makes Ugandan vanilla exceptionally prized by premium food producers globally." } },
                    { "@type": "Question", name: "Which countries does IK Food Uganda export to?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda currently exports to Europe (United Kingdom, Germany, Netherlands, France) and Asia (Japan, South Korea), with expansion into the Middle East underway. The company ships to qualified buyers worldwide." } },
                    { "@type": "Question", name: "How do I order vanilla beans from IK Food Uganda?", acceptedAnswer: { "@type": "Answer", text: "To order vanilla beans from IK Food Uganda, contact the sales team at sales@ikfooduganda.com or call +256 776 341 713. You can also submit an enquiry at ikfoodug.com/contact. The team will discuss grade selection, pricing, minimum order quantities, and logistics." } },
                    { "@type": "Question", name: "How does IK Food Uganda meet export standards?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda holds full phytosanitary export licences and meets EU and international natural standards. Every shipment undergoes rigorous quality control, on-site laboratory testing, and cold-chain logistics to guarantee compliance." } },
                    { "@type": "Question", name: "How does IK Food Uganda support Ugandan farmers?", acceptedAnswer: { "@type": "Answer", text: "IK Food Uganda partners with over 3,000 smallholder farmers across Central Uganda, providing fair-trade pricing, free agronomic training, modern farming techniques, and direct market access. The company's mission is to transform rural livelihoods through sustainable natural agriculture." } },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:font-semibold">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
