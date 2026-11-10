import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getRegion, regionUrl, withRegion } from "@/lib/regions";
import { localize } from "@/lib/localize";
import { RegionLink as Link } from "@/components/RegionProvider";
import PlaceOrderButton from "@/components/PlaceOrderButton";

const metadata: Metadata = {
  title: "IK Food Uganda | #1 Vanilla Company in Uganda | ikfoodug.com",
  description:
    "IK Food Uganda (ikfoodug.com). Search 'IK Food', 'IK-Food Uganda', or 'vanilla in Uganda' and find us. We are the leading natural vanilla exporter in Uganda, competing with the finest producers in Madagascar, Zanzibar and beyond.",
  keywords: [
    "IK Food Uganda",
    "IK Food",
    "IK-Food Uganda",
    "ikfoodug",
    "vanilla in Uganda",
    "IK Food vanilla",
    "top vanilla companies worldwide",
    "top vanilla companies in Uganda",
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "top 10 vanilla companies",
    "best vanilla exporters Uganda",
    "number one vanilla company Uganda",
    "vanilla companies compared to Madagascar",
    "vanilla companies compared to Zanzibar",
    "top vanilla producing countries",
    "Uganda vanilla supplier",
    "premium natural vanilla Uganda",
    "finest vanilla beans in the world",
  ],
  alternates: { canonical: "https://ikfoodug.com" },
};

/* ── Data ────────────────────────────────────────── */

// Home hero background carousel. Previous single photo "/product_hero.avif" is still in /public.
const heroSlides = [
  { src: "/Madagascar_SAVAN_00096_lr-1024x682.webp", alt: "Hands sorting freshly harvested green vanilla pods into a woven basket" },
  { src: "/products/splits-quality_converted.avif", alt: "Bundles of cured, split vanilla beans tied with raffia" },
];

const marquee = ["Grade A beans", "Grade B beans", "Split beans", "Vanilla powder", "Vanilla paste", "Vanilla caviar", "Green beans"];

const products = [
  { id: "grade-a",             name: "Grade A beans",  note: "Long, plump, 30–35% moisture. For pastry, ice cream and infusions.", image: "/products/grade-A_converted.avif" },
  { id: "grade-b",             name: "Grade B beans",  note: "Drier, concentrated. Built for extract manufacturing.",               image: "/products/grade-B_quality_converted.avif" },
  { id: "split-beans",         name: "Split beans",    note: "Hand-split for fast, full flavour release.",                          image: "/products/splits-quality_converted.avif" },
  { id: "vanilla-powder",      name: "Vanilla powder", note: "100% ground bean, ≤3% moisture, no fillers.",                         image: "/products/vanilla_powder.avif" },
  { id: "vanilla-paste",       name: "Vanilla paste",  note: "Real seeds in every spoonful. 1 tsp = 1 pod.",                        image: "/products/vanilla_paste.avif" },
  { id: "vanilla-caviar",      name: "Vanilla caviar", note: "Pure seeds scraped from Grade A pods.",                               image: "/products/vanilla_caviar.jpg" },
  { id: "vanilla-green-beans", name: "Green beans",    note: "Fresh, pre-cure pods for your own curing.",                           image: "/products/green_bean.avif" },
];

const process = [
  { title: "Cultivation", text: "Shade-grown on highland farms, without pesticides." },
  { title: "Harvest",     text: "Hand-picked at peak maturity by trained smallholders." },
  { title: "Curing",      text: "Six months of traditional sun-curing, then graded by hand." },
  { title: "Export",      text: "Phytosanitary clearance and direct dispatch to Europe and Asia." },
];

const specs = [
  { label: "Vanillin content", value: "1.5–2.5%",     detail: "Equal to or above Madagascar's 1.5–2.0%." },
  { label: "Curing",           value: "6 months",     detail: "Blanched, sweated and sun-dried the traditional way." },
  { label: "Harvest",          value: "By hand",      detail: "Picked at peak maturity, never early." },
  { label: "Traceability",     value: "Farm to ship", detail: "Every lot traceable back to its cooperative." },
  { label: "Clearance",        value: "Full",         detail: "Phytosanitary export licence, EU and Asian standards." },
];

const reasons = [
  { title: "International standards", body: "Residue limits, cold-chain handling and full documentation for EU and Asian buyers." },
  { title: "Sustainable at the source", body: "20,000+ smallholders using natural methods that protect Uganda's soils." },
  { title: "Complete traceability",     body: "Every batch ships with farm-to-export records." },
  { title: "Farmers paid fairly",       body: "Guaranteed farm-gate prices, agronomic training and direct market access." },
];

const posts = [
  { slug: "why-ugandan-vanilla-is-the-best",  title: "Why Ugandan vanilla is the best in the world",               date: "Apr 2023", image: "/vanilla_bean_harvest.avif" },
  { slug: "importance-of-vanilla",            title: "The importance of vanilla in the global food industry",      date: "Nov 2022", image: "/IMG_4165_converted.avif" },
  { slug: "navigating-export-requirements",   title: "Navigating international requirements to export vanilla",    date: "Nov 2021", image: "/IMG_3172_converted.avif" },
];

/* ── Page ────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  return withRegion(metadata, getRegion(region).code, "/");
}

export default async function HomePage({ params }: { params: Promise<{ region: string }> }) {
  const r = getRegion((await params).region);

  const faq: { q: string; a: React.ReactNode }[] = [
    {
      q: "What is IK Food Uganda?",
      a: "IK Food Uganda (ikfoodug.com) is Uganda's leading natural vanilla exporter, founded in 2015 and headquartered in Kampala. We supply premium vanilla beans to buyers in Europe and Asia.",
    },
    {
      q: "Is IK Food Uganda the #1 vanilla company in Uganda?",
      a: <>Yes. IK Food Uganda is recognised as the top vanilla company in Uganda. We supply export-grade natural vanilla beans with <strong>1.5–2.5% vanillin content</strong>, among the highest in the world, and hold full phytosanitary export licences.</>,
    },
    {
      q: "How does Ugandan vanilla compare to Madagascar and Zanzibar vanilla?",
      a: <>Ugandan vanilla consistently ranks among the world&apos;s finest. Our beans contain <strong>1.5–2.5% vanillin</strong>, equal to or exceeding Madagascar (1.5–2.0%), with a richer floral complexity and creamy depth unique to <strong>Uganda&apos;s highland climate</strong> and our traditional 6-month sun-curing process.</>,
    },
    {
      q: "What vanilla products does IK Food Uganda supply?",
      a: "We offer 7 premium vanilla forms: Grade A Vanilla Beans, Grade B Vanilla Beans, Vanilla Powder, Split Beans, Vanilla Paste, Vanilla Caviar, and Fresh Green Beans, all hand-harvested in Central Uganda.",
    },
    {
      q: "What certifications does IK Food Uganda hold?",
      a: "IK Food Uganda holds full phytosanitary export licences. All products meet EU and international natural standards with complete farm-to-shipment traceability.",
    },
    {
      q: "Which countries does IK Food Uganda export to?",
      a: <>We export to <strong>Europe (United Kingdom, Germany, Netherlands, France)</strong> and <strong>Asia (Japan, South Korea)</strong>, with expansion into the Middle East underway. We supply qualified buyers worldwide.{r.code === "us" && <> In the United States, orders are handled locally by <strong>{r.name}</strong>.</>}</>,
    },
    {
      q: "How do I order vanilla beans from IK Food Uganda?",
      a: `Email ${r.email} or call ${r.phone.display} (${r.hours.days}, ${r.hours.time.replace(/\s/g, "")} ${r.hours.timezone.split(" ")[0]}). You can also use the enquiry form at ${regionUrl(r.code, "/contact").replace("https://", "")}. Our team will discuss grade selection, pricing, minimum order quantities, and logistics.`,
    },
    {
      q: "Does IK Food Uganda work with smallholder farmers?",
      a: <>Yes. We partner with over <strong>20,000 smallholder farmers</strong> across <strong>Central Uganda&apos;s</strong> highland growing regions. We provide fair-trade pricing, free agronomic training, and direct market access, transforming rural livelihoods through sustainable natural agriculture.</>,
    },
  ];

  return localize(
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section data-hero aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-forest-950 text-cream">
        {/* Full-bleed background carousel at every screen size; the copy sits in front of it.
            Slides crossfade on their own (SmoothScroll, data-hero-slide); there are no controls. */}
        <div className="absolute inset-0 -z-10">
          <div data-hero-media className="relative h-full w-full overflow-hidden bg-forest-900">
            {heroSlides.map((slide, i) => (
              <div
                key={slide.src}
                data-hero-slide
                aria-hidden={i > 0}
                className={`absolute inset-0 ${i === 0 ? "" : "opacity-0"}`}
              >
                <Image
                  src={slide.src}
                  alt={i === 0 ? slide.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="scale-[1.08] object-cover"
                />
              </div>
            ))}
            {/* Scrims keep the copy legible: dark at the bottom everywhere, and from the left on desktop. */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-forest-950/30" />
            <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-forest-950/85 via-forest-950/40 to-transparent lg:block" />
          </div>
        </div>

        <div className="mx-auto flex h-[100svh] min-h-[32rem] max-w-7xl flex-col px-5 pb-10 pt-[calc(88px+3.5rem)] sm:px-8 sm:pt-[calc(6rem+3.5rem)] lg:px-12 lg:pb-12 lg:pt-[calc(106px+5rem)]">
          <div className="grid flex-1 content-end">
            <div data-hero-copy className="max-w-5xl">
              <h1 id="hero-title" data-hero-title data-no-reveal className="h-hero text-[clamp(3rem,min(9.6vw,14vh),9.25rem)]">
                Ugandan Vanilla Shipping{" "}
                <span className="-ml-[0.06em] inline-block bg-gold-400 px-[0.06em] pb-[0.02em] text-forest-950">worldwide.</span>
              </h1>

              <div className="mt-10 flex flex-col items-start gap-8 lg:mt-14">
                <p data-hero-foot className="max-w-md text-lg leading-relaxed text-parchment/80 sm:text-xl">
                  Hand-pollinated, sun-cured vanilla from Uganda&apos;s highlands, exported to food makers across Europe and Asia.
                </p>
                <div data-hero-foot className="flex shrink-0 flex-wrap items-center gap-8">
                  <Link
                    href="/products"
                    className="btn-gold shadow-[0_0_36px_-6px_rgba(156,232,0,0.6)] hover:shadow-[0_0_56px_-4px_rgba(156,232,0,0.75)]"
                  >
                    See our vanilla
                  </Link>
                  <Link href="/about" className="link-line-light">Our story</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div data-marquee aria-hidden className="overflow-hidden bg-parchment py-5 text-forest-950 sm:py-7">
        <div data-marquee-track className="flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marquee.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-6 text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em] sm:px-10">{item}</span>
                  <span className="h-3 w-3 rounded-full bg-forest-950 sm:h-4 sm:w-4" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ───────────────────────────────── */}
      <section className="bg-cream text-forest-950" aria-labelledby="who-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:px-12 lg:py-36">
          <div>
            <h2 id="who-title" data-split className="h-section">
              Uganda&apos;s vanilla, straight from the growers.
            </h2>
            <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-forest-900/75">
              <p data-reveal>
                Founded in 2015 in Kampala, IK Food Uganda grows, cures and exports premium natural vanilla from{" "}
                <strong className="text-forest-950">Uganda&apos;s fertile highlands</strong> to buyers in{" "}
                <strong className="text-forest-950">Europe and Asia</strong>.
              </p>
              <p data-reveal>
                Every lot meets EU and Asian market standards, with full traceability from farm to shipment, backed by
                direct partnerships with smallholder farmers.
              </p>
            </div>
            <div data-reveal className="mt-10">
              <Link href="/about" className="link-line">Read our story</Link>
            </div>
          </div>
          <div data-clip data-parallax className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
            <Image
              src="/products/grade-A_converted.avif"
              alt="Grade A Ugandan vanilla beans"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── PRODUCTS: an index of big names; on desktop a photo follows the cursor ── */}
      <section className="bg-forest-950 text-cream" aria-labelledby="products-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="products-title" data-split className="h-section">Every form of vanilla.</h2>
            <p className="max-w-xs text-base leading-relaxed text-parchment/65">
              Whole beans to scrape, powder to bake with, green pods to cure yourself. Seven forms, one origin.
            </p>
          </div>

          <div data-cat-list className="relative mt-14">
            <div
              data-cat-preview
              aria-hidden
              className="pointer-events-none invisible absolute left-0 top-0 z-20 hidden h-72 w-56 overflow-hidden rounded-2xl bg-forest-900 shadow-2xl lg:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={products[0].image} className="h-full w-full object-cover" />
            </div>

            <ul>
              {products.map((p) => (
                <li key={p.id} data-rule>
                  <Link href={`/products#${p.id}`} data-cat-row data-image={p.image} className="group relative flex items-center gap-5 py-5 sm:py-7">
                    <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-cream/15" />
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-forest-900 lg:hidden">
                      <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span data-rule-text className="block min-w-0 flex-1">
                      <span className="block text-[clamp(1.9rem,5.5vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.045em] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-gold-400">
                        {p.name}
                      </span>
                    </span>
                    <span className="hidden max-w-xs text-sm leading-relaxed text-parchment/55 xl:block">{p.note}</span>
                    <span aria-hidden className="text-2xl font-extrabold text-cream/30 transition duration-500 group-hover:translate-x-1 group-hover:text-gold-400">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <span className="block h-px bg-cream/15" />
          </div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────── */}
      <section className="bg-forest-900 text-cream" aria-label="How our vanilla is made">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <p data-scrub-words className="text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
              Nine months on the vine, then six months curing in the sun. Our growers never rush it, so the flavour runs
              deep: <span data-ember className="text-[#cc5500]">rich, creamy, floral.</span>
            </p>
            <div data-clip data-parallax className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/vanilla_bean_harvest.avif"
                alt="Freshly harvested Ugandan vanilla beans"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div data-process className="relative mt-20 lg:mt-28">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10">
              <div data-process-line className="h-full w-full origin-left bg-[#ebdfc0]" />
            </div>
            <ol className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {process.map((step) => (
                <li key={step.title} data-process-step>
                  <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-cream sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-parchment/70">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <Link href="/impact" className="link-line-light mt-16">
            Meet the communities behind it
          </Link>
        </div>
      </section>

      {/* ── STANDARDS ────────────────────────────────── */}
      <section className="bg-parchment text-forest-950" aria-labelledby="standards-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 id="standards-title" data-split className="h-section">Graded by hand, tested every lot.</h2>
            <p className="max-w-md text-lg leading-relaxed text-forest-900/70">
              Uganda&apos;s highland climate and slow curing give our beans one of the highest vanillin levels in the world.
            </p>
          </div>

          <ul className="mt-16">
            {specs.map((row) => (
              <li key={row.label} data-rule className="relative grid gap-2 py-7 md:grid-cols-[1fr_0.8fr_1.4fr] md:items-baseline md:gap-8">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <span data-rule-text className="text-base font-bold text-forest-900/60">{row.label}</span>
                <span data-rule-text className="text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{row.value}</span>
                <span data-rule-text className="text-base text-forest-900/70">{row.detail}</span>
              </li>
            ))}
          </ul>
          <span className="block h-px bg-forest-950/20" />
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────── */}
      <section className="bg-cream text-forest-950" aria-labelledby="why-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-36">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="why-title" data-split className="h-section">Quality you can trace.</h2>
            <div data-clip className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
              <Image src="/exhibition.avif" alt="IK Food Uganda at an international vanilla exhibition" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ol>
            {reasons.map((item, i) => (
              <li key={item.title} data-rule className="relative grid gap-3 py-9 sm:grid-cols-[3rem_1fr]">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <span data-rule-text className="text-sm font-bold tabular-nums text-forest-900/50">{String(i + 1).padStart(2, "0")}</span>
                <div data-rule-text>
                  <h3 className="text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-forest-900/70">{item.body}</p>
                </div>
              </li>
            ))}
            <li aria-hidden className="h-px bg-forest-950/20" />
          </ol>
        </div>
      </section>

      {/* ── EXPORT ───────────────────────────────────── */}
      <section className="overflow-hidden bg-forest-950 text-cream" aria-labelledby="export-title">
        <div className="py-20 lg:py-28">
          <p data-slide-x aria-hidden className="whitespace-nowrap text-[clamp(4rem,14vw,13rem)] font-extrabold leading-none tracking-[-0.05em] text-parchment">
            Shipping worldwide. Shipping worldwide.
          </p>
          <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12">
            <div>
              <h2 id="export-title" data-no-reveal className="sr-only">Shipping worldwide</h2>
              <p data-reveal className="max-w-xl text-xl leading-relaxed text-parchment/75 sm:text-2xl">
                Chocolate makers, ice cream producers, extract manufacturers and distributors in the UK, Germany, the
                Netherlands, France, Japan and South Korea buy direct from us, with full export paperwork.
              </p>
              <div data-reveal className="mt-10 flex flex-wrap items-center gap-8">
                <PlaceOrderButton variant="gold" label="Request a quote" />
                <Link href="/case-studies" className="link-line-light">How we export</Link>
              </div>
            </div>
            <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-forest-900">
              <Image
                src="/372838c3-c504-48e1-b9b1-3b34442d01d2_converted.avif"
                alt="IK Food Uganda team with packaged vanilla ready for export"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────── */}
      <section className="bg-cream text-forest-950" aria-labelledby="blog-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="blog-title" data-split className="h-section">From the field notes.</h2>
            <Link href="/blog" className="link-line shrink-0">All articles</Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} data-card className="group">
                <Link href={`/blog#${post.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-sm font-bold text-forest-900/50">{post.date}</p>
                  <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.03em] transition-colors group-hover:text-gold-600">
                    {post.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ: visible Q&A for search and AI engines ── */}
      <section id="faq" className="scroll-mt-32 bg-forest-950 text-cream" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-36">
          <h2 id="faq-title" data-split className="h-display text-[clamp(2.5rem,5.5vw,4.75rem)]">
            Good to know before you order.
          </h2>
          <div itemScope itemType="https://schema.org/FAQPage">
            {faq.map(({ q, a }) => (
              <details
                key={q}
                data-rule
                className="group relative [&_summary::-webkit-details-marker]:hidden"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-cream/15" />
                <summary
                  data-rule-text
                  itemProp="name"
                  className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl font-extrabold tracking-[-0.02em] transition-colors hover:text-gold-400 sm:text-2xl"
                >
                  {q}
                  <span aria-hidden className="text-3xl font-light leading-none text-gold-400 transition duration-300 group-open:rotate-45">+</span>
                </summary>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="-mt-2 max-w-2xl pb-8 text-base leading-relaxed text-parchment/65 [&_strong]:text-cream">
                    {a}
                  </p>
                </div>
              </details>
            ))}
            <span className="block h-px bg-cream/15" />
            <Link href="/contact" className="link-line-light mt-10">Ask us something else</Link>
          </div>
        </div>
      </section>
    </>,
    r.code,
  );
}
