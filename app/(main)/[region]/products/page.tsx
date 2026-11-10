import React from "react";
import type { Metadata } from "next";
import { getRegion, withRegion } from "@/lib/regions";
import { localize } from "@/lib/localize";
import Image from "next/image";
import { RegionLink as Link } from "@/components/RegionProvider";
import PageHero from "@/components/PageHero";
import PlaceOrderButton from "@/components/PlaceOrderButton";

const metadata: Metadata = {
  title: "Premium Ugandan Vanilla & Natural Products | IK Food Uganda",
  description:
    "Buy premium natural vanilla beans from one of the top vanilla exporters in Uganda. IK Food Uganda exports export-grade, fully certified natural vanilla trusted by buyers worldwide.",
  keywords: [
    "buy vanilla beans Uganda",
    "premium natural vanilla supplier",
    "top vanilla company Uganda products",
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "Uganda vanilla beans wholesale",
    "best vanilla beans in the world",
    "Ugandan vanilla vs Madagascar vanilla",
    "Ugandan vanilla vs Zanzibar vanilla",
    "natural vanilla export Uganda",
  ],
  openGraph: {
    title: "Premium Ugandan Vanilla & Natural Products | IK Food Uganda",
    description: "Export-grade natural vanilla from one of Uganda's top vanilla companies.",
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
  name: "IK Food Uganda Premium Natural Vanilla Products",
  description: "Complete catalogue of natural vanilla products from IK Food Uganda, Uganda's leading vanilla company. All products are hand-harvested in Central Uganda.",
  url: "https://ikfoodug.com/products",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: {
        "@type": "Product",
        name: "Grade A Vanilla Beans",
        url: "https://ikfoodug.com/products#grade-a",
        description: "Premium export-grade Ugandan vanilla beans, 15–20 cm, 1.5–2.5% vanillin content, 30–35% moisture. Hand-selected.",
        brand: { "@type": "Brand", name: "IK Food Uganda" },
        countryOfOrigin: "Uganda",
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Vanillin Content", value: "1.5–2.5%" },
          { "@type": "PropertyValue", name: "Pod Length", value: "15–20 cm" },
          { "@type": "PropertyValue", name: "Moisture Content", value: "30–35%" },
          { "@type": "PropertyValue", name: "Origin", value: "Central Uganda" },
          { "@type": "PropertyValue", name: "Certification", value: "Export Grade" },
        ],
      },
    },
    {
      "@type": "ListItem", position: 2,
      item: {
        "@type": "Product",
        name: "Grade B Vanilla Beans",
        url: "https://ikfoodug.com/products#grade-b",
        description: "Extraction-grade natural Ugandan vanilla beans (<15 cm), 25–27% moisture. Concentrated vanillin profile, ideal for vanilla extract manufacturing.",
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
        description: "100% pure ground Ugandan vanilla beans. No additives, no fillers. Moisture ≤3%. Available 50 g to 25 kg.",
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
        description: "Hand-split lengthwise Ugandan vanilla beans for fast flavour extraction. 18–25% moisture.",
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
      <>Grade B beans are shorter and drier with a more concentrated <strong>vanillin profile</strong>, purpose-engineered for vanilla extraction and industrial flavouring. Equally pure and naturally grown as Grade A, they offer exceptional value for food manufacturers, extract producers, and commercial bakeries requiring consistent, high-volume supply.</>,
    features: [
      "Optimised for vanilla extract production",
      <>Moisture content <strong>25%–27%</strong>, optimised for extraction</>,
      "Concentrated, consistent vanillin profile",
      "Natural & pesticide-free",
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

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  return withRegion(metadata, getRegion(region).code, "/products");
}

export default async function ProductsPage({ params }: { params: Promise<{ region: string }> }) {
  const r = getRegion((await params).region);
  return localize(
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogueJsonLd) }} />

      <PageHero
        title={<>Our vanilla products<span className="text-[#dccba0]">.</span></>}
        image="/products/splits-quality_converted.avif"
        alt="IK Food Uganda premium vanilla products"
        aside={
          <nav aria-label="Jump to product">
            <ul className="flex flex-wrap gap-2">
              {products.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="inline-block rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-parchment/80 transition-colors hover:border-gold-400 hover:text-gold-400"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        Seven forms of vanilla, all hand-harvested in <strong>Uganda&apos;s highlands</strong>, naturally grown and
        processed to export standards.
      </PageHero>

      {products.map((product, index) => {
        const flip = product.imageSide === "left";
        const tone = index % 2 === 0 ? "bg-cream" : "bg-parchment";
        return (
          <section
            key={product.id}
            id={product.id}
            className={`scroll-mt-8 ${tone} text-forest-950`}
            aria-labelledby={`${product.id}-title`}
          >
            <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-20 lg:px-12 lg:py-32">
              <div
                data-clip
                data-parallax
                className={`relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0] ${flip ? "lg:order-2" : ""}`}
              >
                <Image
                  src={product.image}
                  alt={`${product.name}, premium natural export product from Uganda`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>

              <div>
                <p data-reveal className="text-sm font-bold text-forest-900/55">
                  {product.origin} · {product.spec}
                </p>
                <h2 id={`${product.id}-title`} data-split className="h-section mt-5">{product.name}</h2>
                <p data-reveal className="mt-8 text-2xl font-bold leading-snug tracking-[-0.02em]">{product.tagline}</p>
                <p data-reveal className="mt-6 text-lg leading-relaxed text-forest-900/75 [&_strong]:text-forest-950">
                  {product.description}
                </p>

                <div className="mt-12 grid gap-10 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold text-forest-900/55">Key features</h3>
                    <ul className="mt-4">
                      {product.features.map((f, i) => (
                        <li key={i} data-rule className="relative py-3.5 text-base text-forest-900/80 [&_strong]:text-forest-950">
                          <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/15" />
                          <span data-rule-text className="block">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-forest-900/55">Common uses</h3>
                    <ul className="mt-4">
                      {product.uses.map((u) => (
                        <li key={u} data-rule className="relative py-3.5 text-base font-semibold">
                          <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/15" />
                          <span data-rule-text className="block">{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div data-reveal className="mt-12 flex flex-wrap items-center gap-8">
                  <PlaceOrderButton variant="dark" label={`Order ${product.name.toLowerCase()}`} />
                  <Link href="/contact" className="link-line">Ask for a sample</Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>,
    r.code,
  );
}
