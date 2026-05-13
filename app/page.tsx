import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sprout,
  Scissors,
  Package,
  Globe2,
  ChevronDown,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "IK Food Uganda | #1 Vanilla Company in Uganda — ikfoodug.com",
  description:
    "IK Food Uganda (ikfoodug.com) — search 'IK Food', 'IK-Food Uganda', or 'vanilla in Uganda' and find us. We are the leading organic vanilla exporter in Uganda, competing with the finest producers in Madagascar, Zanzibar and beyond.",
  keywords: [
    "IK Food Uganda",
    "IK Food",
    "IK-Food Uganda",
    "ikfoodug",
    "vanilla in Uganda",
    "IK Food vanilla",
    "top vanilla companies worldwide",
    "top vanilla companies in Uganda",
    "top 10 vanilla companies",
    "best vanilla exporters Uganda",
    "number one vanilla company Uganda",
    "vanilla companies compared to Madagascar",
    "vanilla companies compared to Zanzibar",
    "top vanilla producing countries",
    "Uganda vanilla supplier",
    "premium organic vanilla Uganda",
    "finest vanilla beans in the world",
  ],
  alternates: { canonical: "https://ikfoodug.com" },
};

/* ── Data ────────────────────────────────────────── */

const ticker = [
  "Ugandan Vanilla", "Grade A Vanilla Beans", "100% Organic", "Grade B Vanilla Beans",
  "Est. 2015", "Vanilla Powder", "HORTIFRESH Certified", "Split Beans",
  "Leading Exporter", "Vanilla Green Beans", "Vanilla Paste", "Vanilla Caviar",
];

const stats = [
  { value: "100%", label: "Organically grown" },
  { value: "2+",   label: "Export markets" },
];

const vanillaSpecs = [
  { value: "1.5–2.5%", label: "Vanillin content",    sub: "World-leading grade" },
  { value: "6 mo.",    label: "Sun-curing period",   sub: "Traditional methods" },
  { value: "100%",     label: "Hand-harvested",      sub: "At peak maturity" },
  { value: "Organic",  label: "Fully certified",     sub: "EU & Asian markets" },
];

const products = [
  { id: "vanilla",     name: "Ugandan Vanilla",    origin: "Central Uganda",         note: "Rich · Creamy · Complex",    image: "/IMG_4873_converted.avif" },
  { id: "coffee",      name: "Fine Robusta Coffee", origin: "Highland Regions",       note: "Bold · Low Acid · Rich Crema", image: "/coffee-plantation.jpg" },
  { id: "cocoa",       name: "Organic Cocoa",       origin: "Central & West Uganda",  note: "Fine Flavour · Fermented",   image: "/IMG_4160_converted.avif" },
  { id: "avocado",     name: "Hass Avocado",        origin: "Highland Farms",         note: "Export Grade · Class I",     image: "/IMG_7889_converted.avif" },
  { id: "garden-eggs", name: "Garden Eggs",          origin: "Central Uganda",         note: "Firm · Vibrant · Nutritious", image: "/IMG_3062_converted.avif" },
];

const process = [
  { n: "01", Icon: Sprout,  title: "Cultivation",  body: "Organic seeds, biodynamic soil preparation, and shade-grown techniques on Uganda's highland farms." },
  { n: "02", Icon: Scissors, title: "Harvest",     body: "Hand-picked at peak maturity by trained smallholder farmers, with careful handling at every step." },
  { n: "03", Icon: Package, title: "Processing",   body: "On-site quality testing, traditional curing, grading, and cold-chain packing to export specifications." },
  { n: "04", Icon: Globe2,  title: "Export",       body: "Full certification documentation, phytosanitary clearance, and direct dispatch to Europe and Asia." },
];

const posts = [
  {
    slug: "why-ugandan-vanilla-is-the-best",
    title: "Why Ugandan Vanilla is the Best in the World",
    date: "Apr 2023", category: "Organic",
    excerpt: "Uganda's vanillin concentration, traditional sun-curing methods, and unique highland climate combine to produce vanilla that consistently surpasses all others.",
    image: "/vanilla_bean_harvest.avif",
  },
  {
    slug: "importance-of-vanilla",
    title: "The Importance of Vanilla in the Global Food Industry",
    date: "Nov 2022", category: "Natural",
    excerpt: "From premium ice cream to fine perfumery, natural vanilla commands a premium that synthetic alternatives can never replicate.",
    image: "/IMG_4165_converted.avif",
  },
  {
    slug: "navigating-export-requirements",
    title: "Navigating International Requirements to Export Vanilla",
    date: "Nov 2021", category: "Export",
    excerpt: "A practical guide to the certifications, compliance steps, and logistics required to successfully export vanilla from Uganda.",
    image: "/IMG_3172_converted.avif",
  },
];

const certs = [
  { label: "HORTIFRESH Member",   sub: "Fresh Produce Exporters Association" },
  { label: "Organic Certified",   sub: "EU & International Standards" },
  { label: "Export Grade",        sub: "Full Phytosanitary Clearance" },
  { label: "Est. 2015",           sub: "Decade of organic excellence" },
];

/* ── Page ────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO — split screen
      ══════════════════════════════════════════════════ */}
      <section className="relative bg-forest-950 min-h-screen pt-16 overflow-hidden" aria-label="Hero">

        {/* Image — absolute, covers right 68% */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[68%] relative h-[60vw] min-h-[320px] max-h-[500px] lg:h-auto lg:max-h-none overflow-hidden">
          <Image
            src="/product_hero.avif"
            alt="Close-up of premium Ugandan vanilla beans — hand-harvested and sun-cured"
            fill className="object-cover object-[right_20%]"
            priority sizes="(max-width: 1024px) 100vw, 68vw"
          />
          {/* Gradient: forest-950 → transparent */}
          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-forest-950 from-0% via-forest-950/55 via-30% via-forest-950/18 via-55% to-transparent to-100% hidden lg:block" aria-hidden="true" />
          {/* Mobile bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-950 to-transparent lg:hidden" aria-hidden="true" />

          {/* Floating: Vanillin spec */}
          <div className="absolute bottom-8 right-8 glass-card px-5 py-4 min-w-[160px] hidden lg:block" aria-hidden="true">
            <p className="text-[10px] text-white/45 uppercase tracking-widest mb-1">Vanillin Content</p>
            <p className="text-2xl font-bold font-heading text-white leading-none">1.5–2.5%</p>
            <p className="text-xs text-gold-400 mt-1">World-class quality</p>
          </div>
        </div>

        {/* Content — left 35% on desktop, below image on mobile */}
        <div className="relative z-10 flex flex-col justify-end px-8 sm:px-12 lg:pl-24 lg:pr-8 pt-8 pb-16 lg:py-24 lg:min-h-screen lg:w-[35%]">
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gold-400/15 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
              <span className="label-tag text-white/40">Est. 2015 · Kampala, Uganda</span>
            </div>

            <h1 className="font-heading text-[clamp(2.4rem,5.5vw,5.2rem)] leading-[0.88] font-bold text-white mb-6 tracking-tight">
              Pure Ugandan{" "}
              <em className="text-gradient-gold not-italic block leading-none">Vanilla,</em>
              Perfected.
            </h1>

            <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-10 max-w-sm">
              Premium organic agricultural products cultivated in Uganda&apos;s
              fertile highlands and exported to discerning buyers worldwide.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <Link href="/products" className="btn-gold">
                Explore Products
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline-white">
                Talk to Us
              </Link>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <dt className="text-[2.1rem] font-bold font-heading text-white leading-none tracking-tight">
                    {value}
                  </dt>
                  <dd className="text-white/35 text-xs mt-1.5 tracking-widest uppercase">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href="#vanilla-spotlight"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-white/25 hover:text-white/60 transition-colors focus-visible:outline-none"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
          </a>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════════════ */}
      <div className="bg-gold-400 py-3 overflow-hidden marquee-track" aria-hidden="true">
        {[1, 2].map((i) => (
          <div key={i} className={`marquee-content animate-marquee${i === 2 ? "2" : ""} whitespace-nowrap`}>
            {[...ticker, ...ticker].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-4 px-6 text-forest-950 text-xs font-semibold tracking-[0.15em] uppercase">
                {item}
                <span className="w-1 h-1 rounded-full bg-forest-800/40 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          VANILLA SPOTLIGHT (new)
      ══════════════════════════════════════════════════ */}
      <section id="vanilla-spotlight" className="section-y bg-cream map-bg relative scroll-mt-0" aria-label="Vanilla spotlight">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Asymmetric image stack */}
            <ScrollReveal className="relative h-[520px] shrink-0">
              {/* Large main image */}
              <div className="absolute top-0 left-0 right-10 bottom-16 rounded-3xl overflow-hidden img-zoom shadow-2xl">
                <Image
                  src="/exhibition.avif"
                  alt="Premium Ugandan vanilla beans — hand-harvested"
                  fill className="object-cover" sizes="40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
              </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal delay={80}>
              <span className="section-eyebrow">Our Flagship Product</span>
              <h2 className="text-display-lg font-bold text-forest-950 mb-4 text-balance leading-tight">
                The IK Vanilla Standard
              </h2>
              <div className="w-10 h-px bg-gold-400 mb-6" aria-hidden="true" />
              <p className="text-forest-950/70 leading-relaxed mb-10">
                Uganda grows some of the world&apos;s finest vanilla — prized for
                its exceptional vanillin concentration, floral complexity, and
                rich creamy depth. Our beans are hand-harvested at peak
                maturity and sun-cured using methods refined over generations,
                creating a flavour profile that chocolate makers and premium
                food producers globally seek out by name.
              </p>

              {/* Spec grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {vanillaSpecs.map(({ value, label, sub }) => (
                  <div key={label} className="border border-forest-950/15 rounded-2xl p-5 hover:border-gold-400/60 transition-colors group">
                    <p className="text-2xl font-bold font-heading text-gold-500 leading-none mb-1 group-hover:text-gold-400 transition-colors">
                      {value}
                    </p>
                    <p className="text-forest-950/80 text-sm font-medium">{label}</p>
                    <p className="text-forest-950/50 text-xs mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

              <Link href="/products#vanilla" className="btn-gold group">
                Discover Our Vanilla
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT EDITORIAL
      ══════════════════════════════════════════════════ */}
      <section className="section-y bg-cream map-bg" aria-label="About IK Food Uganda">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">

            {/* Text */}
            <div className="lg:col-span-5 xl:col-span-4">
              <ScrollReveal>
                <span className="section-eyebrow">Who We Are</span>
                <span className="text-[5rem] font-bold font-heading text-forest-950/[0.06] leading-none select-none block -mb-3" aria-hidden="true">
                  01
                </span>
                <h2 className="text-display-lg font-bold text-forest-950 leading-tight mb-5 text-balance">
                  Uganda&apos;s Premier Organic Exporter
                </h2>
                <div className="h-rule mb-6" aria-hidden="true" />
                <p className="text-gray-600 leading-relaxed mb-4 text-[0.95rem]">
                  Founded in 2015 and headquartered in Kampala, IK Food Uganda
                  is a HORTIFRESH-certified organic exporter specialising in
                  vanilla, coffee, cocoa, avocado, and garden eggs — grown in
                  Uganda&apos;s fertile highlands and distributed to Europe and Asia.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-[0.95rem]">
                  Every product meets EU and Asian market standards with full
                  traceability from farm to shipment, backed by direct
                  smallholder farmer partnerships and rigorous quality control.
                </p>
                <ul className="space-y-2.5 mb-10" role="list">
                  {[
                    "Certified organic — EU & Asian market compliant",
                    "Full supply-chain traceability",
                    "Direct smallholder farmer partnerships",
                    "HORTIFRESH member · Certified since 2021",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-forest-600 mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-sm text-gray-700">{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="btn-outline-dark group">
                  Our Story
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </ScrollReveal>
            </div>

            {/* Image mosaic — overlapping offset layout */}
            <div className="lg:col-span-7 xl:col-span-8 relative h-[500px] lg:h-[580px]">
              {/* Main large image */}
              <ScrollReveal delay={50} className="absolute top-0 left-0 w-[58%] h-[75%] rounded-3xl overflow-hidden img-zoom shadow-xl">
                <Image src="/products/grade-A_converted.avif" alt="Grade A Ugandan vanilla beans" fill className="object-cover" sizes="30vw" />
              </ScrollReveal>
              {/* Top-right image */}
              <ScrollReveal delay={110} className="absolute top-0 right-0 w-[38%] h-[45%] rounded-3xl overflow-hidden img-zoom shadow-lg">
                <Image src="/products/green_bean.avif" alt="Fresh green vanilla beans on the vine" fill className="object-cover" sizes="20vw" />
              </ScrollReveal>
              {/* Bottom-right image */}
              <ScrollReveal delay={170} className="absolute bottom-0 right-0 w-[45%] h-[48%] rounded-3xl overflow-hidden img-zoom shadow-lg">
                <Image src="/products/vanilla_paste.avif" alt="Premium Ugandan vanilla paste" fill className="object-cover" sizes="20vw" />
              </ScrollReveal>
              {/* Bottom-left small overlap */}
              <ScrollReveal delay={230} className="absolute bottom-0 left-[15%] w-[35%] h-[30%] rounded-2xl overflow-hidden img-zoom shadow-lg border-4 border-cream">
                <Image src="/products/splits-quality_converted.avif" alt="Hand-split vanilla beans" fill className="object-cover" sizes="15vw" />
              </ScrollReveal>
              {/* Floating badge */}
              <div className="absolute bottom-[28%] right-[43%] bg-forest-950 text-white rounded-xl px-4 py-3 shadow-xl z-10" aria-hidden="true">
                <p className="text-xl font-bold font-heading leading-none">10+</p>
                <p className="text-white/40 text-[10px] mt-0.5 tracking-wide uppercase">Yrs organic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PRODUCTS SHOWCASE
      ══════════════════════════════════════════════════ */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="Our products">
        <div className="max-w-7xl mx-auto container-px">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <ScrollReveal>
              <span className="section-eyebrow-light">What We Grow</span>
              <span className="text-[5rem] font-bold font-heading text-white/[0.05] leading-none select-none block -mb-3" aria-hidden="true">
                02
              </span>
              <h2 className="text-display-lg font-bold text-white leading-tight text-balance">
                Premium Organic Products
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <Link href="/products" className="btn-outline-cream shrink-0">
                All 5 Products
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Vanilla — hero card */}
          <ScrollReveal className="mb-5">
            <Link
              href="/products#vanilla"
              className="group relative rounded-4xl overflow-hidden flex items-end h-[460px] md:h-[560px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="View Ugandan Vanilla"
            >
              <Image
                src="/Allspicery_Vanilla_Vines.webp"
                alt="Premium Ugandan vanilla beans"
                fill className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" aria-hidden="true" />
              {/* Top-right detail chip */}
              <div className="absolute top-6 right-6 glass-card px-4 py-2.5" aria-hidden="true">
                <p className="text-xs text-vanilla-300 font-medium">Vanillin 1.5–2.5%</p>
              </div>
              <div className="relative z-10 p-8 md:p-12 flex flex-col sm:flex-row sm:items-end justify-between w-full gap-4">
                <div>
                  <span className="chip bg-gold-400 text-forest-950 mb-3 font-semibold">★ Best Seller</span>
                  <h3 className="text-4xl md:text-5xl font-bold font-heading text-white mb-1 tracking-tight">
                    Ugandan Vanilla
                  </h3>
                  <p className="text-white/50 text-sm tracking-wide">Central Uganda · Rich · Creamy · Complex</p>
                </div>
                <div className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm font-medium shrink-0 group-hover:bg-white/20 transition-colors">
                  View Product
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* 4 product grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {products.slice(1).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 70}>
                <Link
                  href={`/products#${p.id}`}
                  className="group relative rounded-3xl overflow-hidden flex items-end h-64 md:h-72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  aria-label={`View ${p.name}`}
                >
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="(max-width: 640px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" aria-hidden="true" />
                  <div className="relative z-10 p-6 w-full">
                    <h3 className="text-xl font-bold font-heading text-white mb-0.5 tracking-tight">{p.name}</h3>
                    <p className="text-white/45 text-xs">{p.origin} · {p.note}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS STEPS (new)
      ══════════════════════════════════════════════════ */}
      <section className="section-y bg-cream map-bg" aria-label="Farm to export process">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow">Our Journey</span>
            <span className="text-[5rem] font-bold font-heading text-forest-950/[0.06] leading-none select-none block -mb-3" aria-hidden="true">
              03
            </span>
            <h2 className="text-display-lg font-bold text-forest-950 text-balance">
              From Uganda&apos;s Soil to Your Facility
            </h2>
          </ScrollReveal>

          <div className="relative grid md:grid-cols-4 gap-8">
            {/* Connecting line */}
            <div className="absolute top-[2.2rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-gold-300/0 via-gold-400/60 to-gold-300/0 hidden md:block pointer-events-none" aria-hidden="true" />

            {process.map(({ n, Icon, title, body }, i) => (
              <ScrollReveal key={n} delay={i * 90}>
                <div className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="relative mb-6">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-forest-900 flex items-center justify-center group-hover:bg-forest-700 transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6 text-gold-400" aria-hidden="true" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-400 text-forest-950 text-[10px] font-bold flex items-center justify-center shadow">
                      {n}
                    </span>
                  </div>
                  <h3 className="font-semibold text-forest-950 mb-2 text-lg">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY US
      ══════════════════════════════════════════════════ */}
      <section className="section-y bg-white map-bg" aria-label="Why choose IK Food Uganda">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            <ScrollReveal>
              <span className="section-eyebrow">The IK Advantage</span>
              <span className="text-[5rem] font-bold font-heading text-forest-950/[0.06] leading-none select-none block -mb-3" aria-hidden="true">
                04
              </span>
              <h2 className="text-display-lg font-bold text-forest-950 leading-tight mb-10 text-balance">
                Quality You Can Trust, Values You Believe In
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { n: "01", title: "International Standards",    body: "Every product meets rigorous EU and Asian requirements — residue limits, cold-chain logistics, full certification." },
                  { n: "02", title: "Sustainable at the Source",  body: "3,000+ smallholder farmers using biodynamic and organic methods that protect Uganda's biodiverse soils." },
                  { n: "03", title: "Complete Traceability",      body: "Every batch ships with full farm-to-export traceability — you always know exactly where your product originated." },
                  { n: "04", title: "Farmer Empowerment",         body: "Fair-trade pricing, agronomic training, and market access give local farmers a genuine stake in success." },
                ].map(({ n, title, body }) => (
                  <div key={n} className="bg-cream rounded-2xl p-5 border border-forest-100 hover:border-gold-300/60 transition-colors group">
                    <span className="label-tag text-gold-500 mb-3 block">{n}</span>
                    <h3 className="font-semibold text-forest-900 mb-1.5 text-[0.95rem]">{title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} className="relative">
              <div className="relative rounded-4xl overflow-hidden h-[540px] img-zoom shadow-xl">
                <Image
                  src="/exhibition.avif"
                  alt="IK Food Uganda at international vanilla exhibition"
                  fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-forest-950 text-white rounded-2xl px-6 py-5 shadow-2xl" aria-hidden="true">
                <p className="text-3xl font-bold font-heading leading-none">10+</p>
                <p className="text-white/40 text-xs mt-1 tracking-widest uppercase">Years organic</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VANILLA QUOTE
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40" aria-label="Vanilla feature">
       
        <div className="absolute inset-0 bg-forest-950/82" aria-hidden="true" />
        {/* Diagonal gold accent line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-gold-400/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto container-px text-center">
          <ScrollReveal>
            <span className="label-tag text-forest-900 mb-6 block">Our Flagship · Ugandan Vanilla</span>
            <blockquote className="text-[clamp(1.6rem,3.5vw,2.75rem)] font-heading font-bold text-forest-900 leading-snug mb-10 text-balance">
              &ldquo;Ugandan vanilla carries a richness and complexity unmatched
              anywhere in the world — born from the soil, the climate, and
              the hands that tend it.&rdquo;
            </blockquote>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/products#vanilla" className="btn-gold">
                Explore Our Vanilla
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/case-studies" className="btn-outline-cream">
                Read Case Studies
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BLOG — editorial layout
      ══════════════════════════════════════════════════ */}
      <section className="section-y bg-parchment map-bg" aria-label="Latest from the blog">
        <div className="max-w-7xl mx-auto container-px">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <ScrollReveal>
              <span className="section-eyebrow">Insights</span>
              <span className="text-[5rem] font-bold font-heading text-forest-950/[0.06] leading-none select-none block -mb-3" aria-hidden="true">
                05
              </span>
              <h2 className="text-display-lg font-bold text-forest-950 text-balance">
                From the Blog
              </h2>
            </ScrollReveal>
            <Link href="/blog" className="btn-outline-dark shrink-0">
              All Articles
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Featured first post — large */}
          <ScrollReveal className="mb-5">
            <article className="group">
              <Link
                href={`/blog#${posts[0].slug}`}
                className="surface-card grid md:grid-cols-2 overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 block"
                aria-label={`Read: ${posts[0].title}`}
              >
                <div className="relative h-64 md:h-auto min-h-[280px] img-zoom overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                  <Image src={posts[0].image} alt={posts[0].title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <span className="absolute top-4 left-4 chip bg-forest-900 text-white">{posts[0].category}</span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <time className="label-tag text-gray-400 mb-3 block">{posts[0].date}</time>
                  <h3 className="text-2xl font-bold font-heading text-forest-950 leading-snug mb-3 group-hover:text-forest-700 transition-colors text-balance">
                    {posts[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-1.5 text-forest-600 text-sm font-medium">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </article>
          </ScrollReveal>

          {/* 2 smaller posts */}
          <div className="grid md:grid-cols-2 gap-5">
            {posts.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <article className="surface-card group h-full flex flex-col">
                  <Link href={`/blog#${post.slug}`} className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 rounded-2xl">
                    <div className="relative h-48 img-zoom overflow-hidden rounded-t-2xl">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="50vw" />
                      <span className="absolute top-3 left-3 chip bg-forest-900 text-white">{post.category}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <time className="label-tag text-gray-400 mb-2 block">{post.date}</time>
                      <h3 className="font-semibold text-forest-950 leading-snug mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-forest-600 text-sm font-medium mt-4 pt-4 border-t border-gray-100">
                        Read article
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRUST / CERTIFICATIONS STRIP (new)
      ══════════════════════════════════════════════════ */}
      <section className="py-14 bg-forest-950 border-y border-white/5" aria-label="Certifications and trust signals">
        <div className="max-w-7xl mx-auto container-px">
          <p className="label-tag text-white/30 text-center mb-8">Trusted &amp; Certified</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-white/10">
            {/* Logo */}
            <div className="flex items-center justify-center px-8">
              <Image
                src="/logo_clean.webp"
                alt="IK Food Uganda logo"
                width={120}
                height={60}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            {/* Certs */}
            {certs.map(({ label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center px-6 py-2">
                <p className="font-semibold text-white text-base mb-1">{label}</p>
                <p className="text-white/35 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="section-y relative overflow-hidden" aria-label="Contact call to action">
        {/* Full background image */}
        <Image
          src="/ed0a6bce-3812-4326-aa6c-8e9a6502aa34_converted.avif"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay so text stays legible */}
        <div className="absolute inset-0 bg-forest-950/80" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto container-px">
          <div className="max-w-2xl">
            <ScrollReveal>
              <span className="section-eyebrow-light">Ready to Source?</span>
              <h2 className="text-display-xl font-bold text-white mb-6 text-balance leading-tight">
                Let&apos;s Build Something Great Together
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-lg">
                Whether you&apos;re a distributor, wholesaler, chocolate maker, or
                retailer — we&apos;d love to discuss how IK Food Uganda can power
                your supply chain with premium organic products.
              </p>
              <div className="flex flex-wrap gap-3 mb-16">
                <Link href="/contact" className="btn-gold">
                  Contact Our Team
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link href="/products" className="btn-outline-cream">
                  Browse Products
                </Link>
              </div>

              {/* Bottom stats row */}
              <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-10 border-t border-white/10">
                {[
                  { value: "3,000+", label: "Farmers" },
                  { value: "25 MT",  label: "Annual harvest" },
                  { value: "2+",     label: "Export markets" },
                  { value: "100%",   label: "Organic" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <dt className="text-2xl font-bold font-heading text-white leading-none">{value}</dt>
                    <dd className="text-white/35 text-xs mt-1 tracking-widest uppercase">{label}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
