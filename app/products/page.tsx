import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceOrderButton from "@/components/PlaceOrderButton";

export const metadata: Metadata = {
  title: "Premium Ugandan Vanilla & Organic Products | IK Food Uganda",
  description:
    "Buy premium organic vanilla beans from one of the top vanilla companies in Uganda. IK Food Uganda also exports Fine Robusta coffee, organic cocoa, Hass avocado and garden eggs — all export-grade, fully certified, and trusted by buyers worldwide.",
  keywords: [
    "buy vanilla beans Uganda",
    "premium organic vanilla supplier",
    "top vanilla company Uganda products",
    "Uganda vanilla beans wholesale",
    "best vanilla beans in the world",
    "Ugandan vanilla vs Madagascar vanilla",
    "Ugandan vanilla vs Zanzibar vanilla",
    "organic vanilla export Uganda",
    "Fine Robusta coffee Uganda",
    "organic cocoa Uganda export",
    "Hass avocado Uganda export",
  ],
  openGraph: {
    title: "Premium Ugandan Vanilla & Organic Products | IK Food Uganda",
    description: "Export-grade organic vanilla, coffee, cocoa, avocado and garden eggs from one of Uganda's top vanilla companies.",
    url: "https://ikfoodug.com/products",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/products" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ikfoodug.com" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://ikfoodug.com/products" },
  ],
};

const products = [
  {
    id: "vanilla",
    name: "Ugandan Vanilla",
    tagline: "The World's Finest Vanilla Beans",
    origin: "Central Uganda",
    spec: "1.5–2.5% Vanillin Content",
    description:
      "Uganda produces some of the world's finest vanilla — renowned for its exceptionally high vanillin content, rich creamy flavour, and floral complexity. Our beans are hand-harvested at peak maturity, then sun-cured using traditional methods refined over generations, producing a depth of flavour that surpasses industry benchmarks.",
    features: [
      "Vanillin content 1.5–2.5% — world-leading",
      "Hand-harvested at peak maturity",
      "Traditional sun-curing & aging methods",
      "EU Organic Certified",
      "Direct farmer cooperative sourcing",
      "Available in four grades and forms",
    ],
    uses: ["Premium ice cream & dairy", "Artisan chocolate & confectionery", "Perfumery & cosmetics", "Baking & pastry"],
    image: "/IMG_4873_converted.avif",
    imageSide: "right" as const,
    accent: "gold",
    dark: true,
  },
  {
    id: "coffee",
    name: "Fine Robusta Coffee",
    tagline: "Bold, Balanced, Beautifully Ugandan",
    origin: "Highland Regions",
    spec: "High-Altitude Shade-Grown",
    description:
      "Uganda's highland Robusta is celebrated for its bold, full-bodied flavour, naturally low acidity, and rich crema — ideal for espresso blends. Grown at altitude in volcanic soil, our beans develop exceptional depth. We work directly with shade-grown organic farmers, ensuring every batch is traceable from tree to bag.",
    features: [
      "High-altitude shade-grown cultivation",
      "Rich crema — ideal for espresso blends",
      "Low acidity, bold full-body",
      "Natural and washed process options",
      "Full farm-to-cup traceability",
      "Fair-trade farmer partnerships",
    ],
    uses: ["Espresso & specialty coffee", "Commercial roaster blending", "Cold brew & extract", "Instant coffee production"],
    image: "/coffee-plantation.jpg",
    imageSide: "left" as const,
    accent: "green",
    dark: false,
  },
  {
    id: "cocoa",
    name: "Organic Cocoa",
    tagline: "Fine-Flavoured Cocoa from Uganda's Heart",
    origin: "Central & Western Uganda",
    spec: "Naturally Fermented",
    description:
      "Uganda's organic cocoa is gaining recognition among premium chocolate makers worldwide for its complex flavour notes and consistent fermentation quality. Grown in humid central and western regions, pods are carefully harvested, fermented using natural methods, and sun-dried to achieve the optimal moisture and flavour profile.",
    features: [
      "Naturally fermented and sun-dried",
      "Fine-flavour certification eligible",
      "Low pesticide residue guarantee",
      "Available: beans, nibs, paste, butter",
      "Certified organic production",
      "Consistent, tested flavour profile",
    ],
    uses: ["Artisan & craft chocolate", "Cocoa butter production", "Confectionery & baking", "Nutraceuticals & health products"],
    image: "/IMG_4160_converted.avif",
    imageSide: "right" as const,
    accent: "green",
    dark: false,
  },
  {
    id: "avocado",
    name: "Hass Avocado",
    tagline: "Creamy, Nutrient-Rich, Export Grade",
    origin: "Highland Farms",
    spec: "Class I Export Grade",
    description:
      "Uganda's equatorial climate and highland growing regions create ideal conditions for premium Hass avocados with exceptional oil content and creamy texture. Grown by GAP-certified farmers, carefully graded, and packed to EU and Asian export standards — IK Food Uganda is a reliable partner for fresh produce importers worldwide.",
    features: [
      "Class I export grade certified",
      "Consistent sizing (16–28 count)",
      "High oil content (18–25%)",
      "Cold-chain logistics capable",
      "GAP (Good Agricultural Practice) certified",
      "Year-round availability",
    ],
    uses: ["Fresh retail & wholesale", "Food service & restaurants", "Guacamole & dips production", "Avocado oil extraction"],
    image: "/IMG_7889_converted.avif",
    imageSide: "left" as const,
    accent: "green",
    dark: false,
  },
  {
    id: "garden-eggs",
    name: "Garden Eggs",
    tagline: "Fresh African Aubergines, Globally Delivered",
    origin: "Central Uganda",
    spec: "Phytosanitary Certified",
    description:
      "Garden eggs — African eggplants — are a nutritious and versatile vegetable increasingly sought after in international markets. IK Food Uganda grows them sustainably, ensuring vibrant colour, firm texture, and extended shelf life for export. Rich in antioxidants and fibre, they are valued both as a food ingredient and for their health benefits.",
    features: [
      "Vibrant colour and firm texture",
      "Extended shelf life for export",
      "Rich in antioxidants and fibre",
      "Sustainably farmed",
      "White and green varieties available",
      "Phytosanitary certified for export",
    ],
    uses: ["Retail & fresh markets", "West African cuisine export", "Food processing & preserves", "Health food industry"],
    image: "/IMG_3062_converted.avif",
    imageSide: "right" as const,
    accent: "green",
    dark: false,
  },
];

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="Products hero">
        <Image
          src="/IMG_4873_converted.avif"
          alt="Ugandan vanilla beans — IK Food Uganda's premium product"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/30" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <div className="max-w-2xl">
            <span className="section-eyebrow-light mb-4">Premium Organic</span>
            <h1 className="text-display-2xl font-bold text-white mb-6 text-balance">
              Our Products
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Five premium organic products — each cultivated sustainably in
              Uganda&apos;s fertile highlands and processed to the highest
              international export standards.
            </p>
            {/* Jump links */}
            <nav aria-label="Jump to product">
              <ul className="flex flex-wrap gap-2" role="list">
                {products.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`#${p.id}`}
                      className="chip bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* ── Product listings ── */}
      <div>
        {products.map((product, index) => {
          const isLeft = product.imageSide === "left";

          return (
            <section
              key={product.id}
              id={product.id}
              className={`scroll-mt-20 section-y map-bg ${index % 2 === 0 ? "bg-cream" : "bg-white"}`}
              aria-label={`${product.name} product detail`}
            >
              <div className="max-w-7xl mx-auto container-px">
                <div className={`grid lg:grid-cols-2 gap-14 lg:gap-20 items-center ${isLeft ? "lg:grid-flow-col-dense" : ""}`}>

                  {/* Image */}
                  <ScrollReveal
                    delay={60}
                    className={`relative rounded-4xl overflow-hidden h-[420px] md:h-[560px] img-zoom shadow-xl ${isLeft ? "lg:col-start-2" : ""}`}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} — premium organic export product from Uganda`}
                      fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Floating spec tag */}
                    <div className="absolute top-5 left-5 glass-card px-4 py-2.5" aria-hidden="true">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">{product.origin}</p>
                      <p className="text-sm font-semibold text-white">{product.spec}</p>
                    </div>
                  </ScrollReveal>

                  {/* Content */}
                  <ScrollReveal className={isLeft ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <span className="section-eyebrow">{product.tagline}</span>
                    <h2 className="text-display-lg font-bold text-forest-950 mb-2 text-balance">
                      {product.name}
                    </h2>
                    <div className="h-rule mb-6" aria-hidden="true" />
                    <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                    <div className="grid sm:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="label-tag text-forest-700 mb-4">Key Features</h3>
                        <ul className="space-y-2.5" role="list">
                          {product.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-forest-600 mt-0.5 shrink-0" aria-hidden="true" />
                              <span className="text-sm text-gray-700">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="label-tag text-forest-700 mb-4">Common Uses</h3>
                        <ul className="space-y-2.5" role="list">
                          {product.uses.map((u) => (
                            <li key={u} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" aria-hidden="true" />
                              <span className="text-sm text-gray-700">{u}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Vanilla grades & forms */}
                    {product.id === "vanilla" && (
                      <div className="mb-8">
                        <h3 className="label-tag text-forest-700 mb-4">Available Grades &amp; Forms</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { grade: "Grade A", desc: "Premium whole pods, 15–20 cm, high moisture, ≥1.5% vanillin. Ideal for infusion & gourmet use." },
                            { grade: "Grade B", desc: "Baking-grade pods, lower moisture, perfect for extraction, flavouring & food manufacturing." },
                            { grade: "Vanilla Powder", desc: "Pure ground vanilla beans — no fillers or additives. Convenient for industrial baking & dairy." },
                            { grade: "Vanilla Extract Sugar", desc: "Vanilla-infused cane sugar. Ready-to-use for confectionery, pastry & flavoured products." },
                          ].map(({ grade, desc }) => (
                            <div key={grade} className="bg-forest-950/5 border border-forest-950/10 rounded-2xl p-4 hover:border-gold-400/40 hover:bg-gold-400/5 transition-colors">
                              <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-1">{grade}</p>
                              <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <PlaceOrderButton variant="dark" icon="arrow-up-right" />
                  </ScrollReveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Sourcing CTA ── */}
      <section className="py-24 bg-forest-950 noise-overlay relative overflow-hidden" aria-label="Sourcing enquiry CTA">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <Image src="/IMG_7806_converted.avif" alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative max-w-3xl mx-auto container-px text-center">
          <ScrollReveal>
            <span className="section-eyebrow-light">Ready to Source?</span>
            <h2 className="text-display-lg font-bold text-white mb-5 text-balance">
              Looking for Organic Products?
            </h2>
            <p className="text-white/55 text-lg mb-10">
              Contact our team to discuss pricing, minimum order quantities,
              and logistics. We supply distributors, wholesalers, and direct
              buyers across Europe and Asia.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <PlaceOrderButton variant="gold" icon="arrow-right" />
              <Link href="/about" className="btn-outline-cream">
                About Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
