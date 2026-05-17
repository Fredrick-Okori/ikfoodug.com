import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceOrderButton from "@/components/PlaceOrderButton";

export const metadata: Metadata = {
  title: "Premium Ugandan Vanilla & Organic Products | IK Food Uganda",
  description:
    "Buy premium organic vanilla beans from one of the top vanilla companies in Uganda. IK Food Uganda also exports Fine Robusta coffee, organic cocoa, Hass avocado and garden eggs, all export-grade, fully certified, and trusted by buyers worldwide.",
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

const productCatalogueJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "IK Food Uganda Premium Organic Vanilla Products",
  description: "Complete catalogue of organic vanilla products from IK Food Uganda, Uganda's leading vanilla company. All products are hand-harvested in Central Uganda and EU Organic Certified.",
  url: "https://ikfoodug.com/products",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: {
        "@type": "Product",
        name: "Grade A Vanilla Beans",
        url: "https://ikfoodug.com/products#grade-a",
        description: "Premium export-grade Ugandan vanilla beans, 15–20 cm, 1.5–2.5% vanillin content, 30–35% moisture. Hand-selected, EU Organic Certified.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Vanillin Content", value: "1.5–2.5%" },
          { "@type": "PropertyValue", name: "Pod Length", value: "15–20 cm" },
          { "@type": "PropertyValue", name: "Moisture Content", value: "30–35%" },
          { "@type": "PropertyValue", name: "Origin", value: "Central Uganda" },
          { "@type": "PropertyValue", name: "Certification", value: "EU Organic" },
        ],
      },
    },
    {
      "@type": "ListItem", position: 2,
      item: {
        "@type": "Product",
        name: "Grade B Vanilla Beans",
        url: "https://ikfoodug.com/products#grade-b",
        description: "Extraction-grade organic Ugandan vanilla beans (<15 cm), 25–27% moisture. Concentrated vanillin profile, ideal for vanilla extract manufacturing.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem", position: 3,
      item: {
        "@type": "Product",
        name: "Vanilla Powder",
        url: "https://ikfoodug.com/products#vanilla-powder",
        description: "100% pure ground Ugandan vanilla beans. No additives, no fillers. Moisture ≤3%, EU Organic Certified. Available 50 g to 25 kg.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem", position: 4,
      item: {
        "@type": "Product",
        name: "Split Vanilla Beans",
        url: "https://ikfoodug.com/products#split-beans",
        description: "Hand-split lengthwise Ugandan vanilla beans for fast flavour extraction. 18–25% moisture, EU Organic Certified.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem", position: 5,
      item: {
        "@type": "Product",
        name: "Vanilla Paste",
        url: "https://ikfoodug.com/products#vanilla-paste",
        description: "Bean-specked vanilla paste from Ugandan vanilla. Real seeds, intense flavour. 1 tsp = 1 whole vanilla pod. No artificial additives.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem", position: 6,
      item: {
        "@type": "Product",
        name: "Vanilla Caviar",
        url: "https://ikfoodug.com/products#vanilla-caviar",
        description: "100% pure vanilla bean seeds from Grade A Ugandan pods. Intensely concentrated flavour and aroma, no additives or carriers.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem", position: 7,
      item: {
        "@type": "Product",
        name: "Vanilla Green Beans",
        url: "https://ikfoodug.com/products#vanilla-green-beans",
        description: "Fresh pre-cure vanilla pods from Uganda's highland farms with high raw vanillin content. Available seasonally, traceable to individual farm cooperative.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/LimitedAvailability", priceCurrency: "USD" },
      },
    },
  ],
};

const products = [
  {
    id: "grade-a",
    name: "Grade A Vanilla Beans",
    tagline: "The Gold Standard of Ugandan Vanilla",
    origin: "Central Uganda",
    spec: "≥1.5% Vanillin · 15–20 cm pods",
    description:
      <>Our Grade A beans are the pinnacle of <strong>Ugandan vanilla</strong>, long, plump, and visually stunning with a high moisture content and vanillin concentration of <strong>1.5–2.5%</strong>. Hand-selected at harvest and sun-cured using traditional methods, these beans are the preferred choice for premium food brands, gourmet chefs, and high-end confectioners who demand perfection.</>,
    features: [
      <><strong>Pod length 15–20 cm</strong>, premium export grade</>,
      <><strong>Vanillin content ≥1.5%</strong>, world-leading</>,
      <>Moisture content <strong>30%–35%</strong>, rich and supple</>,
      "Hand-selected, individually inspected",
      "EU Organic Certified",
      "Available whole, split, or bundled",
    ],
    uses: ["Gourmet ice cream & dairy", "High-end pastry & desserts", "Vanilla infusions & syrups", "Perfumery & cosmetics"],
    image: "/products/grade-A_converted.avif",
    imageSide: "right" as const,
  },
  {
    id: "grade-b",
    name: "Grade B Vanilla Beans",
    tagline: "Extraction-Grade Beans, Uncompromised Purity",
    origin: "Central Uganda",
    spec: "Extraction Grade · <15 cm pods",
    description:
      <>Grade B beans are shorter and drier with a more concentrated <strong>vanillin profile</strong>, purpose-engineered for vanilla extraction and industrial flavouring. Equally pure and organically grown as Grade A, they offer exceptional value for food manufacturers, extract producers, and commercial bakeries requiring consistent, high-volume supply.</>,
    features: [
      "Optimised for vanilla extract production",
      <>Moisture content <strong>25%–27%</strong>, optimised for extraction</>,
      "Concentrated, consistent vanillin profile",
      "Organic & pesticide-free",
      "Available in bulk quantities",
      "Uniform batch quality, tested every lot",
    ],
    uses: ["Vanilla extract manufacturing", "Commercial food & beverage", "Flavouring compounds", "Bakery & confectionery industry"],
    image: "/products/grade-B_quality_converted.avif",
    imageSide: "left" as const,
  },
  {
    id: "vanilla-powder",
    name: "Vanilla Powder",
    tagline: "Pure Ground Vanilla, Zero Fillers",
    origin: "Central Uganda",
    spec: "100% Pure Ground Vanilla Beans",
    description:
      "Whole Ugandan vanilla pods ground to a fine, aromatic powder with no sugar, no starch, no carriers. Our vanilla powder dissolves evenly in both wet and dry applications, making it the ideal choice for industrial bakers, dairy producers, and health-product formulators who need authentic vanilla flavour in a shelf-stable, easy-to-measure format.",
    features: [
      <><strong>100% pure</strong> ground vanilla, no additives</>,
      <>Moisture content <strong>≤3%</strong>, maximum shelf stability</>,
      "Fine mesh grind for even dispersion",
      "Shelf-stable with long shelf life",
      "Consistent colour, aroma & potency",
      "EU Organic Certified",
      "Packaging: 50 g up to 25 kg bags",
    ],
    uses: ["Industrial baking & dairy", "Dry spice & flavour blending", "Health & supplement products", "Cosmetics & personal care"],
    image: "/products/vanilla_powder.avif",
    imageSide: "right" as const,
  },
  {
    id: "split-beans",
    name: "Split Beans",
    tagline: "Precision-Split for Maximum Flavour Release",
    origin: "Central Uganda",
    spec: "Hand-Split · Export Grade",
    description:
      "Split vanilla beans are whole pods sliced lengthwise to fully expose the rich inner caviar and seeds. This form accelerates flavour extraction and infusion, making them the preferred choice for extract manufacturers, pastry chefs, and beverage producers who demand fast, full-bodied vanilla release without any compromise on purity.",
    features: [
      "Hand-split lengthwise for full caviar exposure",
      <>Moisture content <strong>18%–25%</strong>, ideal for fast infusion</>,
      "Faster extraction & infusion than whole beans",
      <>Same premium <strong>Ugandan vanilla</strong> as Grade A</>,
      "High vanillin content from a rich seed cavity",
      "EU Organic Certified",
      "Available in retail & bulk quantities",
    ],
    uses: ["Vanilla extract & tincture production", "Pastry creams & custards", "Cold brew & beverage infusions", "Premium flavour manufacturing"],
    image: "/products/splits-quality_converted.avif",
    imageSide: "left" as const,
  },
  {
    id: "vanilla-paste",
    name: "Vanilla Paste",
    tagline: "The Chef's Secret: Beans and Extract in One",
    origin: "Central Uganda",
    spec: "Bean-Specked · Ready to Use",
    description:
      "Vanilla paste combines the concentrated flavour of pure vanilla extract with the visual appeal of real vanilla bean seeds, all in one thick, spoonable form. Made from Ugandan vanilla beans, it delivers intense aroma and the signature black specks prized in premium desserts, with none of the prep work of whole pods.",
    features: [
      "Real vanilla bean seeds visible in every spoonful",
      "Intense, concentrated vanilla flavour",
      "No artificial flavours, colours, or preservatives",
      "1 tsp paste = 1 whole vanilla pod",
      "Consistent viscosity & potency batch-to-batch",
      "Available in retail jars & bulk catering packs",
    ],
    uses: ["Patisserie & fine desserts", "Ice cream & gelato production", "Premium beverage flavouring", "Retail consumer baking"],
    image: "/products/vanilla_paste.avif",
    imageSide: "right" as const,
  },
  {
    id: "vanilla-caviar",
    name: "Vanilla Caviar",
    tagline: "Pure Vanilla Seeds, Nature's Black Gold",
    origin: "Central Uganda",
    spec: "100% Pure Vanilla Bean Seeds",
    description:
      "Vanilla caviar is the pure, concentrated seeds scraped from inside premium Ugandan vanilla pods, the most intensely flavoured part of the bean. Jet-black, moist, and bursting with complex aromatic compounds, it delivers immediate, powerful vanilla flavour with striking visual appeal in any application it touches.",
    features: [
      <><strong>100% pure</strong> vanilla bean seeds with no pod fibre</>,
      "Intensely concentrated flavour & aroma",
      "Striking black specks for visual appeal",
      <>Sourced from <strong>Grade A Ugandan vanilla</strong> pods</>,
      "No additives, carriers, or preservatives",
      "Available in small jars & bulk trade packs",
    ],
    uses: ["Fine dining & Michelin-star kitchens", "Premium ice cream & gelato", "Artisan chocolate & confectionery", "Luxury retail products"],
    image: "/products/vanilla_caviar.jpg",
    imageSide: "left" as const,
  },
  {
    id: "vanilla-green-beans",
    name: "Vanilla Green Beans",
    tagline: "Fresh Off the Vine, Unprocessed and Pure",
    origin: "Central Uganda",
    spec: "Fresh Harvest · Pre-Cure",
    description:
      "Vanilla green beans are freshly harvested pods straight from the vine, before curing or drying. Bright, aromatic, and full of raw vanillin potential, they are sought after by extract producers, speciality processors, and research facilities that prefer to control their own curing process from the very first step.",
    features: [
      "Harvested at peak maturity, pre-cure",
      "High raw vanillin and moisture content",
      "Fresh, grassy aroma with floral notes",
      "Ideal for proprietary curing processes",
      "Traceable to individual farm cooperative",
      "Available seasonally, limited quantities",
    ],
    uses: ["Specialty vanilla extract production", "Proprietary curing & processing", "Research & flavour development", "Craft vanilla producers"],
    image: "/products/green_bean.avif",
    imageSide: "right" as const,
  },
];

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogueJsonLd) }} />
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="Products hero">
        <Image
          src="/products/splits-quality_converted.avif"
          alt="IK Food Uganda premium vanilla products"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/30" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <div className="max-w-2xl">
            <span className="section-eyebrow-light mb-4">Ugandan Vanilla</span>
            <h1 className="text-display-2xl font-bold text-white mb-6 text-balance">
              Our Vanilla Products
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Seven distinct vanilla grades and forms, all hand-harvested in
              <strong> Uganda&apos;s highlands</strong>, organically grown, and processed to
              world-class export standards.
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
                      alt={`${product.name}, premium organic export product from Uganda`}
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
                          {product.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5">
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
              Source Premium Ugandan Vanilla
            </h2>
            <p className="text-white/55 text-lg mb-10">
              Contact our team to discuss grade selection, pricing, minimum
              order quantities, and logistics. We supply Grade A &amp; B beans,
              powder, and extract sugar to buyers across Europe and Asia.
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
