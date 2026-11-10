import React from "react";
import type { Metadata } from "next";
import { getRegion, withRegion } from "@/lib/regions";
import { localize } from "@/lib/localize";
import Image from "next/image";
import { RegionLink as Link } from "@/components/RegionProvider";
import PageHero from "@/components/PageHero";
import PlaceOrderButton from "@/components/PlaceOrderButton";

const metadata: Metadata = {
  title: "Our Impact | IK Food Uganda",
  description:
    "IK Food Uganda, one of the top vanilla exporters in Uganda, established in 2015, is a premier exporter of premium natural vanilla committed to sustainable farming, farmer empowerment, and world-class quality standards.",
  keywords: [
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "IK Food Uganda impact",
    "vanilla farming Uganda",
    "sustainable vanilla Uganda",
    "Uganda vanilla export",
  ],
  openGraph: {
    title: "Our Impact | IK Food Uganda",
    description: "How IK Food Uganda, one of the top vanilla exporters in Uganda, is transforming the sector through sustainable farming and premium natural exports.",
    url: "https://ikfoodug.com/impact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/impact" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ikfoodug.com" },
    { "@type": "ListItem", position: 2, name: "Impact", item: "https://ikfoodug.com/impact" },
  ],
};

const stats = [
  { value: "20,000+", label: "Smallholder farmers", sub: "Directly partnered across Uganda" },
  { value: "700 MT",  label: "Annual harvest",      sub: "Of export-grade natural produce" },
  { value: "100%",   label: "Naturally grown",   sub: "Certified EU & Asian standards" },
  { value: "2015",   label: "Year founded",         sub: "A decade of excellence" },
];

const pillars = [
  {
    title: "Sustainable farming",
    body: "We champion biodynamic and natural cultivation methods that protect Uganda's biodiverse soils, reduce chemical inputs, and ensure every farm remains productive for future generations.",
  },
  {
    title: "Farmer empowerment",
    body: "Fair trade pricing, hands-on agronomic training, and direct market access give our 20,000+ smallholder partners the tools to build lasting livelihoods, not just seasonal income.",
  },
  {
    title: "World-class quality",
    body: "Every shipment meets rigorous EU and Asian phytosanitary requirements. Our on-site quality labs and cold-chain logistics ensure zero compromises.",
  },
  {
    title: "Global market access",
    body: "By securing full export licences and international certifications, we open doors that individual farmers cannot, connecting Uganda's highlands directly to premium buyers worldwide.",
  },
];

const commitments = [
  { stat: "20,000+",     desc: "Farmer families directly supported across Uganda" },
  { stat: "Fair price", desc: "Guaranteed minimum farm-gate pricing every season" },
  { stat: "Training",   desc: "Hands-on agronomic and post-harvest handling support" },
];

const journey = [
  { title: "Sorting & grading",     text: "Careful hand-sorting for export grade.",          image: "/Screenshot 2026-05-06 at 14.42.53_converted.avif", alt: "Women sorting and grading fresh vanilla beans at IK Food Uganda" },
  { title: "Community processing",  text: "Farmers work together at collection points.",     image: "/Screenshot 2026-05-06 at 14.46.21_converted.avif", alt: "Community group processing harvested vanilla outdoors in Uganda" },
  { title: "Export ready",          text: "Packaged to international standards.",            image: "/372838c3-c504-48e1-b9b1-3b34442d01d2_converted.avif", alt: "IK Food Uganda team with packaged vanilla ready for export" },
];

const sustainability = [
  "Biodynamic and natural methods that protect Uganda's biodiverse soils.",
  "Fair trade pricing and agronomic training for 20,000+ farmer partners.",
  "Full export licences and phytosanitary clearance for international shipment.",
  "Zero shipment rejection rate. Every batch meets international standards.",
];

const reasons = [
  { title: "Youth employment",        body: "Every order directly creates jobs for young Ugandans, giving them income, purpose, and a stake in their country's agricultural future." },
  { title: "Income for farmers",      body: "Elderly farmers and single mothers receive fair, reliable income through our guaranteed farm-gate pricing and direct market partnerships." },
  { title: "Skills & training",       body: "We invest in people, teaching modern farming, curing, processing, and business development skills that last a lifetime." },
  { title: "Sustainable agriculture", body: "Your purchase helps protect Uganda's land, strengthen rural livelihoods, and build lasting social and economic change for communities." },
];

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  return withRegion(metadata, getRegion(region).code, "/impact");
}

export default async function ImpactPage({ params }: { params: Promise<{ region: string }> }) {
  const r = getRegion((await params).region);
  return localize(
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <PageHero
        title={<>Growing Uganda. Feeding the world<span className="text-[#dccba0]">.</span></>}
        image="/IMG_3172_converted.avif"
        alt="IK Food Uganda farmers working in the field"
      >
        A decade of sustainable agriculture, farmer empowerment and premium natural exports, from{" "}
        <strong>Uganda&apos;s highlands</strong> to <strong>global markets</strong>.
      </PageHero>

      {/* ── Statement ── */}
      <section className="bg-forest-900 text-cream" aria-label="Mission statement">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <p data-scrub-words className="max-w-5xl text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
            Established in 2015, IK Food Uganda exports high-quality natural vanilla, committed to sustainable farming and{" "}
            <span data-ember className="text-[#cc5500]">world-class quality standards.</span>
          </p>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="bg-cream text-forest-950" aria-labelledby="numbers-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <h2 id="numbers-title" data-split className="h-section max-w-4xl">A decade of measurable impact.</h2>
          <dl className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ value, label, sub }) => (
              <div key={label} data-rule className="relative flex flex-col pb-6 pt-8">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <dt data-rule-text className="mt-4 text-lg font-bold">{label}</dt>
                <dd data-count className="order-first text-[clamp(3rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em]">{value}</dd>
                <dd data-rule-text className="mt-1 text-sm text-forest-900/60">{sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="bg-parchment text-forest-950" aria-labelledby="pillars-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <h2 id="pillars-title" data-split className="h-section max-w-4xl">Four pillars of responsible growth.</h2>
          <ol className="mt-16">
            {pillars.map(({ title, body }, i) => (
              <li key={title} data-rule className="relative grid gap-3 py-9 md:grid-cols-[3rem_0.9fr_1.1fr] md:items-baseline md:gap-8">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <span data-rule-text className="text-sm font-bold tabular-nums text-forest-900/50">{String(i + 1).padStart(2, "0")}</span>
                <h3 data-rule-text className="text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{title}</h3>
                <p data-rule-text className="max-w-xl text-base leading-relaxed text-forest-900/70">{body}</p>
              </li>
            ))}
          </ol>
          <span className="block h-px bg-forest-950/20" />
        </div>
      </section>

      {/* ── Communities ── */}
      <section className="bg-forest-950 text-cream" aria-labelledby="communities-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 id="communities-title" data-split className="h-section">The communities behind our vanilla.</h2>
            <p data-reveal className="max-w-md text-lg leading-relaxed text-parchment/65 [&_strong]:text-cream">
              Grown in <strong>Uganda&apos;s lush highlands</strong>, in places like <strong>Ibanda</strong>, by smallholder
              farmers who have cultivated these crops for generations.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <figure>
              <div data-clip data-parallax className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-forest-900 lg:aspect-auto lg:h-full lg:min-h-[32rem]">
                <Image src="/ibanda.avif" alt="Ibanda community, vanilla farming region, Uganda" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
              </div>
              <figcaption data-reveal className="mt-5 max-w-lg">
                <span className="block text-2xl font-extrabold tracking-[-0.03em]">Ibanda, Western Uganda</span>
                <span className="mt-2 block text-base leading-relaxed text-parchment/65">
                  One of our primary sourcing regions, with rich volcanic soils and an equatorial climate that produce beans
                  with exceptional vanillin concentration.
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-col gap-10">
              <figure>
                <div data-clip className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-forest-900">
                  <Image src="/Screenshot 2026-05-06 at 15.31.13_converted.avif" alt="IK Food Uganda farmer inspecting vanilla vines" fill className="object-cover" sizes="(min-width: 1024px) 35vw, 100vw" />
                </div>
                <figcaption data-reveal className="mt-4 text-base font-bold">A farmer checking vine health</figcaption>
              </figure>
              <figure>
                <div data-clip className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-forest-900">
                  <Image src="/vanilla_bean_green.avif" alt="Fresh green vanilla beans on the vine in Uganda" fill className="object-cover" sizes="(min-width: 1024px) 35vw, 100vw" />
                </div>
                <figcaption data-reveal className="mt-4 text-base font-bold">Green beans on the vine, picked at peak maturity</figcaption>
              </figure>
            </div>
          </div>

          <dl className="mt-20 grid gap-x-10 sm:grid-cols-3">
            {commitments.map(({ stat, desc }) => (
              <div key={stat} data-rule className="relative pt-6">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-cream/15" />
                <dt data-rule-text className="text-3xl font-extrabold tracking-[-0.04em] text-gold-400">{stat}</dt>
                <dd data-rule-text className="mt-2 text-base leading-relaxed text-parchment/65">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Field to export ── */}
      <section className="bg-cream text-forest-950" aria-labelledby="journey-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 id="journey-title" data-split className="h-section">From field to export.</h2>
            <p data-reveal className="max-w-md text-lg leading-relaxed text-forest-900/70">
              Every bean passes through careful hands, harvested, sorted, processed and packed before it leaves Uganda.
            </p>
          </div>
          <ol className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {journey.map((step, i) => (
              <li key={step.title} data-card className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
                  <Image src={step.image} alt={step.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 640px) 33vw, 100vw" />
                </div>
                <p className="mt-5 text-sm font-bold tabular-nums text-forest-900/50">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-2 text-base text-forest-900/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Sustainability ── */}
      <section className="bg-forest-900 text-cream" aria-labelledby="land-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12 lg:py-36">
          <div className="grid grid-cols-2 gap-4">
            <div data-clip data-parallax className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-forest-950">
              <Image src="/IMG_7889_converted.avif" alt="Natural farming practices at IK Food Uganda" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div data-clip className="relative col-span-2 aspect-[16/7] overflow-hidden rounded-[1.75rem] bg-forest-950">
              <Image src="/79a461de-c579-4d35-bc23-b1e5ba5f51f3_converted.avif" alt="Close-up of vanilla vines with green beans in Uganda's highlands" fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
          <div>
            <h2 id="land-title" data-split className="h-section">Committed to the land and the people.</h2>
            <ul className="mt-12">
              {sustainability.map((text) => (
                <li key={text} data-rule className="relative py-5 text-lg leading-relaxed text-parchment/80">
                  <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-cream/15" />
                  <span data-rule-text className="block">{text}</span>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10">
              <Link href="/about" className="link-line-light">Our full story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why buy from us ── */}
      <section className="bg-parchment text-forest-950" aria-labelledby="why-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-36">
          <div>
            <h2 id="why-title" data-split className="h-section">Every order changes lives.</h2>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-forest-900/75 [&_strong]:text-forest-950">
              <p data-reveal>
                When you buy from IK Food Uganda, you are not only purchasing <strong>premium Ugandan vanilla</strong>.
                You are supporting communities and changing lives.
              </p>
              <p data-reveal>
                Your support creates jobs for young people, provides income for elderly farmers and single mothers, and
                gives rural communities a reliable market for their crops.
              </p>
            </div>
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-8">
              <PlaceOrderButton variant="dark" label="Start an order" />
              <Link href="/products" className="link-line">View products</Link>
            </div>
          </div>
          <ol>
            {reasons.map(({ title, body }) => (
              <li key={title} data-rule className="relative py-8">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <h3 data-rule-text className="text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{title}</h3>
                <p data-rule-text className="mt-3 max-w-lg text-base leading-relaxed text-forest-900/70">{body}</p>
              </li>
            ))}
            <li aria-hidden className="h-px bg-forest-950/20" />
          </ol>
        </div>
      </section>
    </>,
    r.code,
  );
}
