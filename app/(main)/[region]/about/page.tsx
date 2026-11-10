import React from "react";
import type { Metadata } from "next";
import { getRegion, withRegion } from "@/lib/regions";
import { localize } from "@/lib/localize";
import Image from "next/image";
import { RegionLink as Link } from "@/components/RegionProvider";
import PageHero from "@/components/PageHero";
import TeamCard from "@/components/TeamCard";

const metadata: Metadata = {
  title: "About IK Food Uganda | Top Vanilla Exporter Since 2015",
  description:
    "Founded in 2015 in Kampala, IK Food Uganda is one of the top vanilla exporters in Uganda. We empower 20,000+ smallholder farmers to produce export-grade natural vanilla, rivalling the best producers in Madagascar, Zanzibar, and other top vanilla-producing countries.",
  keywords: [
    "about IK Food Uganda",
    "top vanilla company Uganda",
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "Uganda vanilla exporter history",
    "best vanilla producers Africa",
    "vanilla company founded 2015",
    "top vanilla producing countries Africa",
    "export certified Uganda",
  ],
  openGraph: {
    title: "About IK Food Uganda | Top Vanilla Exporter Since 2015",
    description: "The story of one of Uganda's top vanilla companies, founded in 2015, with 20,000+ farmer partners, exporting globally.",
    url: "https://ikfoodug.com/about",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ikfoodug.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://ikfoodug.com/about" },
  ],
};

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ikfoodug.com/about#israel-kaweesa",
      name: "Israel Kaweesa",
      jobTitle: "General Manager",
      description: "Israel Kaweesa is the General Manager and founder of IK Food Uganda. With over a decade of agribusiness experience, he built IK Food Uganda from a Kampala-based startup in 2015 into one of Uganda's top natural vanilla exporters, supplying premium beans to Europe and Asia.",
      worksFor: { "@type": "Organization", name: "IK Food Uganda", url: "https://ikfoodug.com" },
      knowsAbout: ["Natural vanilla export Uganda", "Agricultural trade East Africa", "Vanilla bean cultivation", "Export certification"],
      nationality: { "@type": "Country", name: "Uganda" },
    },
  ],
};

const milestoneJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ikfoodug.com/#organization",
  name: "IK Food Uganda",
  foundingDate: "2015",
  description: "IK Food Uganda, Uganda's leading vanilla company, was founded in Kampala in 2015. Key milestones: 2021 achieved full export licences; 2022 expanded into European and Asian markets; 2024 reached 20,000+ farmer partners and 700 MT annual harvest.",
};

const values = [
  { n: "01", title: "Quality Excellence",    body: <>The highest standards across every stage of production, processing, and export, <strong>from seed to shipment</strong>.</> },
  { n: "02", title: "Innovation",            body: "Continuously refining processes and products to meet evolving international market requirements." },
  { n: "03", title: "Sustainability",        body: "Biodynamic and natural methods that protect Uganda's rich, biodiverse soils for future generations." },
  { n: "04", title: "Community Impact",       body: "Every purchase creates jobs, supports youth employment, strengthens rural livelihoods, and builds better futures for families across Uganda." },
];

const milestones = [
  { year: "2015", event: "IK Food Uganda founded in Kampala with a focus on vanilla cultivation and export." },
  { year: "2018", event: "Scaled vanilla cultivation partnerships across Uganda's highland regions." },
  { year: "2021", event: "Achieved full export licences and quality certifications." },
  { year: "2022", event: "Expanded export markets into Europe and Asia." },
  { year: "2024", event: "Reached 20,000+ farmer partners and a 700 MT annual harvest." },
];

const team = [
  {
    name: "Israel Kaweesa",
    role: "General Manager",
    bio: "Israel leads IK Food Uganda with a passion for quality and international market growth. His decade of agribusiness experience has built the company into a trusted global exporter.",
    image: "/israel-kaweesa.jpg",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  return withRegion(metadata, getRegion(region).code, "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ region: string }> }) {
  const r = getRegion((await params).region);
  return localize(
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(milestoneJsonLd) }} />

      <PageHero
        title={<>About IK Food (U) Ltd<span className="text-gold-500">.</span></>}
        image="/quality_split.avif"
        alt="Ugandan farmers in the field, IK Food Uganda's farming partnerships"
      >
        A Kampala vanilla grower and exporter, founded in 2015 to build a fair, reliable market for Uganda&apos;s farmers.
      </PageHero>

      {/* ── Story ── */}
      <section className="bg-cream text-forest-950" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-36">
          <div>
            <h2 id="story-title" data-split className="h-section">From Uganda&apos;s soil to the world&apos;s table.</h2>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-forest-900/75">
              <p data-reveal>
                IK Food Uganda was founded with a mission to transform lives through agriculture by creating opportunities
                for young people, elderly farmers, and rural communities across Uganda. We specialise in premium Ugandan
                vanilla and other natural agricultural products, while building a sustainable and reliable supply chain
                for farmers.
              </p>
              <p data-reveal>
                Our goal is not only to deliver high-quality products to international markets, but also to empower
                communities through employment, skills development, and fair trade partnerships. We train and support
                farmers in modern farming, curing, and processing techniques to improve product quality and household
                incomes.
              </p>
              <p data-reveal>
                At IK Food Uganda, every product purchased creates impact. It helps farmers access reliable markets,
                supports youth employment, strengthens rural livelihoods, and contributes to building a better future for
                families and communities.
              </p>
            </div>
            <div data-reveal className="mt-10">
              <Link href="/products" className="link-line">See our products</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:pt-24">
            <div data-clip data-parallax className="relative row-span-2 min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
              <Image src="/vanilla_bean_harvest.avif" alt="Premium Ugandan vanilla beans" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
            <div data-clip className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
              <Image src="/Screenshot 2026-05-06 at 14.42.53_converted.avif" alt="Agricultural processing in Uganda" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
            <div data-clip className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
              <Image src="/ibanda.avif" alt="Green farmland in Uganda" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-forest-900 text-cream" aria-label="Mission and vision">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <p className="text-sm font-bold text-parchment/50">Our mission</p>
          <p data-scrub-words className="mt-6 max-w-5xl text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
            To transform lives through agriculture, creating opportunities for young people, elderly farmers and rural
            communities, while delivering <span data-ember className="text-[#cc5500]">premium natural products</span> to
            international markets.
          </p>
          <div data-rule className="relative mt-20 grid gap-6 pt-10 lg:grid-cols-[0.4fr_1fr]">
            <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-cream/15" />
            <p data-rule-text className="text-sm font-bold text-parchment/50">Our vision</p>
            <p data-rule-text className="max-w-3xl text-2xl font-bold leading-snug tracking-[-0.02em] text-parchment/85 sm:text-3xl">
              To be the preferred supplier of premium Ugandan vanilla and other natural agricultural products, recognised
              for quality, sustainability, and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-parchment text-forest-950" aria-labelledby="values-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-36">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="values-title" data-split className="h-section">What we stand for.</h2>
            <div data-clip className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
              <Image src="/IMG_3172_converted.avif" alt="Lush natural farmland in Uganda" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>
          <ol>
            {values.map(({ title, body }, i) => (
              <li key={title} data-rule className="relative grid gap-3 py-9 sm:grid-cols-[3rem_1fr]">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <span data-rule-text className="text-sm font-bold tabular-nums text-forest-900/50">{String(i + 1).padStart(2, "0")}</span>
                <div data-rule-text>
                  <h3 className="text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{title}</h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-forest-900/70">{body}</p>
                </div>
              </li>
            ))}
            <li aria-hidden className="h-px bg-forest-950/20" />
          </ol>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="bg-cream text-forest-950" aria-labelledby="milestones-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <h2 id="milestones-title" data-split className="h-section">Ten years in the making.</h2>
          <ol className="mt-16">
            {milestones.map(({ year, event }) => (
              <li key={year} data-rule className="relative grid gap-3 py-8 md:grid-cols-[0.5fr_1fr] md:items-baseline md:gap-8">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <span data-rule-text className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em]">{year}</span>
                <p data-rule-text className="max-w-xl text-lg leading-relaxed text-forest-900/75">{event}</p>
              </li>
            ))}
          </ol>
          <span className="block h-px bg-forest-950/20" />
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-forest-950 text-cream" aria-labelledby="team-title">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="team-title" data-split className="h-section">The people behind it.</h2>
            <Link href="/contact" className="link-line-light shrink-0">Talk to the team</Link>
          </div>
          <div className="mt-16 space-y-20 lg:space-y-28">
            {team.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>,
    r.code,
  );
}
