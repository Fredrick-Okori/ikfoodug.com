import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About IK Food Uganda | Top Vanilla Exporter Since 2015",
  description:
    "Founded in 2015 in Kampala, IK Food Uganda is one of the top vanilla companies in Uganda. We empower 3,000+ smallholder farmers to produce export-grade organic vanilla — rivalling the best producers in Madagascar, Zanzibar, and other top vanilla-producing countries.",
  keywords: [
    "about IK Food Uganda",
    "top vanilla company Uganda",
    "Uganda vanilla exporter history",
    "best vanilla producers Africa",
    "vanilla company founded 2015",
    "top vanilla producing countries Africa",
    "HORTIFRESH member Uganda",
  ],
  openGraph: {
    title: "About IK Food Uganda | Top Vanilla Exporter Since 2015",
    description: "The story of one of Uganda's top vanilla companies — founded 2015, 3,000+ farmer partners, exporting globally.",
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
      description: "Israel Kaweesa is the General Manager and founder of IK Food Uganda. With over a decade of agribusiness experience, he built IK Food Uganda from a Kampala-based startup in 2015 into one of Uganda's top organic vanilla exporters, supplying premium beans to Europe and Asia.",
      worksFor: { "@type": "Organization", name: "IK Food Uganda", url: "https://ikfoodug.com" },
      knowsAbout: ["Organic vanilla export Uganda", "Agricultural trade East Africa", "Vanilla bean cultivation", "HORTIFRESH certification"],
      nationality: { "@type": "Country", name: "Uganda" },
    },
    {
      "@type": "Person",
      "@id": "https://ikfoodug.com/about#evelyn-najjemba",
      name: "Evelyn Najjemba",
      jobTitle: "Agroecologist",
      description: "Evelyn Najjemba is the Agroecologist at IK Food Uganda. She oversees sustainable farming practices and farmer training across IK Food Uganda's 3,000+ smallholder farmer network, ensuring all agricultural output meets EU Organic and HORTIFRESH standards.",
      worksFor: { "@type": "Organization", name: "IK Food Uganda", url: "https://ikfoodug.com" },
      knowsAbout: ["Organic agriculture Uganda", "Biodynamic farming", "Vanilla cultivation", "Smallholder farmer training"],
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
  description: "IK Food Uganda — Uganda's #1 vanilla company — was founded in Kampala in 2015. Key milestones: 2018 expanded to coffee, cocoa, avocado and garden eggs; 2021 achieved full export licences; 2022 joined HORTIFRESH; 2024 reached 3,000+ farmer partners and 25 MT annual harvest.",
};

const values = [
  { n: "01", title: "Quality Excellence",    body: "The highest standards across every stage of production, processing, and export — from seed to shipment." },
  { n: "02", title: "Innovation",            body: "Continuously refining processes and products to meet evolving international market requirements." },
  { n: "03", title: "Sustainability",        body: "Biodynamic and organic methods that protect Uganda's rich, biodiverse soils for future generations." },
  { n: "04", title: "Community Impact",       body: "Every purchase creates jobs, supports youth employment, strengthens rural livelihoods, and builds better futures for families across Uganda." },
];

const milestones = [
  { year: "2015", event: "IK Food Uganda founded in Kampala with a focus on vanilla cultivation and export." },
  { year: "2018", event: "Expanded to coffee, cocoa, Hass avocado, and garden eggs." },
  { year: "2021", event: "Achieved full export licences and quality certifications." },
  { year: "2022", event: "Joined HORTIFRESH — Uganda's fresh produce exporters association." },
  { year: "2024", event: "Reached 3,000+ customers and 25 MT annual harvest milestone." },
];

const team = [
  {
    name: "Israel Kaweesa",
    role: "General Manager",
    bio: "Israel leads IK Food Uganda with a passion for quality and international market growth. His decade of agribusiness experience has built the company into a trusted global exporter.",
    image: "/elijah.webp",
  },
  {
    name: "Evelyn Najjemba",
    role: "Agroecologist",
    bio: "Evelyn oversees sustainable farming practices and farmer training, ensuring IK Food Uganda's agricultural output meets the highest organic and environmental standards.",
    image: "/andrea_webp.webp",
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(milestoneJsonLd) }} />
      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="About hero">
        <Image
          src="/quality_split.avif"
          alt="Ugandan farmers in the field — IK Food Uganda's farming partnerships"
          fill className="object-cover object-center" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <div className="max-w-xl">
            <span className="section-eyebrow-light mb-4">Our Story</span>
            <h1 className="text-display-2xl font-bold text-white text-balance">
              About IK Food (U) Ltd
            </h1>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="section-y bg-cream map-bg" aria-label="Company story">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <ScrollReveal>
              <span className="section-eyebrow">Established 2015</span>
              <h2 className="text-display-lg font-bold text-forest-950 mb-6 text-balance">
                From Uganda&apos;s Soil to the World&apos;s Table
              </h2>
              <div className="h-rule mb-6" aria-hidden="true" />
              <p className="text-gray-600 leading-relaxed mb-4">
                IK Food Uganda was founded with a mission to transform lives
                through agriculture by creating opportunities for young people,
                elderly farmers, and rural communities across Uganda. We
                specialise in premium Ugandan vanilla and other organic
                agricultural products, while building a sustainable and
                reliable supply chain for farmers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our goal is not only to deliver high-quality products to
                international markets, but also to empower communities through
                employment, skills development, and fair trade partnerships.
                We train and support farmers in modern farming, curing, and
                processing techniques to improve product quality and household
                incomes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                At IK Food Uganda, every product purchased creates impact. It
                helps farmers access reliable markets, supports youth
                employment, strengthens rural livelihoods, and contributes to
                building a better future for families and communities. We
                believe agriculture can be a tool for economic growth,
                sustainability, and lasting social change.
              </p>
              <Link href="/products" className="btn-dark group">
                Our Products
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={80} className="relative grid grid-cols-2 gap-4 h-[480px]">
              <div className="row-span-2 img-zoom rounded-3xl overflow-hidden relative">
                <Image src="/vanilla_bean_harvest.avif" alt="Premium Ugandan vanilla beans" fill className="object-cover" sizes="25vw" />
              </div>
              <div className="img-zoom rounded-3xl overflow-hidden relative">
                <Image src="/Screenshot 2026-05-06 at 14.42.53_converted.avif" alt="Agricultural processing in Uganda" fill className="object-cover" sizes="25vw" />
              </div>
              <div className="img-zoom rounded-3xl overflow-hidden relative">
                <Image src="/ibanda.avif" alt="Green farmland in Uganda" fill className="object-cover" sizes="25vw" />
              </div>
              {/* floating year badge */}
              <div className="absolute -bottom-5 -right-5 bg-forest-950 text-white rounded-2xl px-6 py-5 shadow-xl" aria-hidden="true">
                <p className="text-3xl font-bold font-heading">10+</p>
                <p className="text-white/45 text-xs mt-0.5">Years of excellence</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="Mission and vision">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-14">
            <span className="section-eyebrow-light">Purpose</span>
            <h2 className="text-display-lg font-bold text-white text-balance">
              Mission &amp; Vision
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={40}>
              <div className="border border-white/10 rounded-3xl p-8 md:p-10 h-full">
                <p className="label-tag text-gold-400 mb-4">Our Mission</p>
                <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold-400/40 pl-5">
                  &ldquo;To transform lives through agriculture by creating
                  opportunities for young people, elderly farmers, and rural
                  communities — delivering premium organic products to
                  international markets while building a sustainable and
                  reliable supply chain for farmers.&rdquo;
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 h-full">
                <p className="label-tag text-forest-300 mb-4">Our Vision</p>
                <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-forest-400/40 pl-5">
                  &ldquo;To be the preferred supplier of premium Ugandan vanilla and
                  other organic agricultural products, recognised for quality,
                  sustainability, and integrity.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-y bg-parchment map-bg" aria-label="Core values">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <ScrollReveal>
              <span className="section-eyebrow">What We Stand For</span>
              <h2 className="text-display-lg font-bold text-forest-950 mb-10 text-balance">
                Our Core Values
              </h2>
              <div className="space-y-7">
                {values.map(({ n, title, body }) => (
                  <div key={n} className="flex gap-5">
                    <span className="text-sm font-semibold text-gold-500 shrink-0 pt-0.5 w-7">{n}</span>
                    <div>
                      <h3 className="font-semibold text-forest-900 mb-1">{title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="relative rounded-4xl overflow-hidden h-[500px] img-zoom shadow-xl">
                <Image
                  src="/IMG_3172_converted.avif"
                  alt="Lush organic farmland in Uganda"
                  fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-y bg-white map-bg" aria-label="Company milestones">
        <div className="max-w-5xl mx-auto container-px">
          <ScrollReveal className="text-center mb-14">
            <span className="section-eyebrow">Our Journey</span>
            <h2 className="text-display-lg font-bold text-forest-950">Key Milestones</h2>
          </ScrollReveal>
          <ol className="relative border-l-2 border-forest-100 ml-4 space-y-10" role="list">
            {milestones.map(({ year, event }, i) => (
              <ScrollReveal key={year} delay={i * 60}>
                <li className="relative pl-8">
                  <span className="absolute left-0 -translate-x-1/2 -translate-y-px w-4 h-4 rounded-full bg-forest-700 border-4 border-white shadow" aria-hidden="true" />
                  <span className="chip bg-gold-400/20 text-gold-600 font-bold mb-2">{year}</span>
                  <p className="text-gray-700 leading-relaxed mt-1">{event}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-y bg-cream map-bg" aria-label="Our team">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center mb-14">
            <span className="section-eyebrow">The People Behind IK Food</span>
            <h2 className="text-display-lg font-bold text-forest-950">Meet Our Team</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 80}>
                <div className="surface-card p-7 group text-center">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-5 img-zoom">
                    <Image src={m.image} alt={`Portrait of ${m.name}, ${m.role}`} fill className="object-cover" sizes="96px" />
                  </div>
                  <h3 className="font-bold text-forest-950 text-lg font-heading">{m.name}</h3>
                  <p className="text-gold-600 font-medium text-xs tracking-widest uppercase mt-1 mb-3">{m.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-forest-950 noise-overlay relative" aria-label="Contact CTA">
        <div className="max-w-3xl mx-auto container-px text-center">
          <ScrollReveal>
            <h2 className="text-display-lg font-bold text-white mb-5 text-balance">
              Ready to Work Together?
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Whether you&apos;re a distributor, wholesaler, or retailer —
              let&apos;s discuss how we can supply your organic product needs.
            </p>
            <Link href="/contact" className="btn-gold">
              Contact Our Team
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
