import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Vanilla Export Case Studies | IK Food Uganda",
  description:
    "Real-world case studies from IK Food Uganda — one of the top vanilla companies in Uganda — on exporting premium organic vanilla and fresh produce to Europe and Asia.",
  keywords: [
    "Uganda vanilla export case study",
    "top vanilla exporter Uganda success",
    "organic vanilla export Africa",
    "Uganda agricultural export",
  ],
  openGraph: {
    title: "Vanilla Export Case Studies | IK Food Uganda",
    description: "Real-world export success stories from one of Uganda's top vanilla companies.",
    url: "https://ikfoodug.com/case-studies",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/case-studies" },
};

const studies = [
  {
    id: "exporting-fresh-produce",
    num: "01",
    category: "Export Operations",
    readTime: "8 min",
    title: "Exporting Fresh Produce from Uganda — The IK Food Advantage",
    overview:
      "How IK Food Uganda built a scalable export system for organic produce, overcoming regulatory, logistical, and quality challenges to serve European and Asian markets reliably.",
    challenge: {
      heading: "The Challenge",
      body: "Ugandan exporters face stringent EU phytosanitary requirements, cold-chain gaps, and complex certification demands. Many small agribusinesses suffer rejected shipments and financial losses navigating these barriers.",
      points: [
        "Meeting EU maximum residue limits (MRLs) for pesticides",
        "Maintaining cold-chain from farm gate to airfreight",
        "Securing HACCP, organic, and export certifications",
        "Building reliable international distributor relationships",
        "Managing seasonal supply consistency",
      ],
    },
    approach: {
      heading: "Our Approach",
      body: "IK Food developed a vertically integrated quality and compliance system, investing in infrastructure, farmer training, and certification to consistently meet international standards.",
      points: [
        "Direct farmer partnerships with agronomic training",
        "On-site quality control labs for residue testing",
        "Refrigerated transport and cold-chain investment",
        "HORTIFRESH membership for regulatory guidance",
        "Dedicated export documentation and compliance team",
      ],
    },
    results: [
      { metric: "3,000+", label: "Farmers in our network" },
      { metric: "25 MT",  label: "Annual harvest volume" },
      { metric: "2+",     label: "International markets" },
      { metric: "0%",     label: "Shipment rejection rate" },
    ],
    conclusion:
      "By combining rigorous quality systems with genuine farmer partnerships, IK Food has demonstrated that Ugandan agricultural businesses can compete at the highest global levels.",
    image: "/IMG_3172_converted.avif",
  },
  {
    id: "vanilla-industry-growth",
    num: "02",
    category: "Industry Analysis",
    readTime: "10 min",
    title: "The Growth and Challenges of Uganda's Vanilla Industry",
    overview:
      "How Uganda's vanilla sector has grown from niche crop to globally recognised commodity — and the structural challenges IK Food is helping solve through sustainable, farmer-first production.",
    challenge: {
      heading: "Industry Background",
      body: "Uganda is among the world's top vanilla producers. Yet the sector has historically been marked by price volatility, premature harvesting, and exploitation of smallholder farmers who lack market access and technical knowledge.",
      points: [
        "Price volatility causing boom-bust cycles for farmers",
        "Premature harvesting reducing vanillin content quality",
        "Lack of farmer education on curing techniques",
        "Limited traceability from farm to buyer",
        "Competition from synthetic vanillin depressing prices",
      ],
    },
    approach: {
      heading: "How IK Food Responds",
      body: "IK Food addresses these issues by working directly with vanilla farmers — providing technical training, fair and stable pricing, and infrastructure needed to produce world-class cured vanilla that commands premium prices.",
      points: [
        "Technical training on pollination, curing, post-harvest handling",
        "Guaranteed minimum farm-gate prices during downturns",
        "Investment in curing infrastructure for cooperatives",
        "Direct relationships with premium chocolate companies",
        "Advocacy for GI labelling for Ugandan vanilla",
      ],
    },
    results: [
      { metric: "1.5–2.5%", label: "Average vanillin content" },
      { metric: "Premium",   label: "Price tier achieved" },
      { metric: "EU + Asia", label: "Markets accessed" },
      { metric: "100%",      label: "Organically certified" },
    ],
    conclusion:
      "Uganda's vanilla has the quality to command world attention. What it needs is the right production systems, market access, and farmer empowerment — exactly what IK Food Uganda provides.",
    image: "/IMG_4873_converted.avif",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="Case studies hero">
        <Image
          src="/IMG_3172_converted.avif"
          alt="Vanilla beans — the focus of IK Food Uganda's case studies"
          fill className="object-cover object-bottom" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/65 to-forest-950/25" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <div className="max-w-xl">
            <span className="section-eyebrow-light mb-4">Real-World Insights</span>
            <h1 className="text-display-2xl font-bold text-white text-balance">Case Studies</h1>
            <p className="text-white/55 mt-4 text-lg">
              How IK Food Uganda navigates the complexities of organic export
              agriculture — the challenges, strategies, and outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Study cards overview ── */}
      <section className="py-14 bg-cream map-bg border-b border-forest-100" aria-label="Case study overview">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid md:grid-cols-2 gap-6">
            {studies.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="surface-card group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600"
              >
                <div className="relative h-48 img-zoom overflow-hidden">
                  <Image src={s.image} alt={s.title} fill className="object-cover" sizes="50vw" />
                  <div className="absolute inset-0 bg-forest-950/30 group-hover:bg-forest-950/10 transition-colors" />
                  <span className="absolute top-4 left-4 chip bg-forest-900 text-white">{s.category}</span>
                  <span className="absolute top-4 right-4 chip bg-gold-400 text-forest-950 font-bold text-xs">{s.num}</span>
                </div>
                <div className="p-6">
                  <p className="label-tag text-gray-400 mb-2">{s.readTime} read</p>
                  <h2 className="font-semibold text-forest-950 leading-snug mb-2 group-hover:text-forest-700 transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{s.overview}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-forest-600 text-sm font-medium">
                    <span>Read full study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full case studies ── */}
      {studies.map((s, si) => (
        <article key={s.id} id={s.id} className={`scroll-mt-20 section-y map-bg ${si % 2 === 0 ? "bg-white" : "bg-parchment"}`} aria-label={s.title}>
          <div className="max-w-7xl mx-auto container-px">

            {/* Header */}
            <ScrollReveal className="max-w-3xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="chip bg-gold-400/20 text-gold-700 font-bold text-sm">{s.num}</span>
                <span className="chip bg-forest-100 text-forest-700">{s.category}</span>
                <span className="label-tag text-gray-400">{s.readTime} read</span>
              </div>
              <h2 className="text-display-lg font-bold text-forest-950 mb-4 text-balance">{s.title}</h2>
              <div className="h-rule mb-5" aria-hidden="true" />
              <p className="text-gray-600 text-lg leading-relaxed">{s.overview}</p>
            </ScrollReveal>

            {/* Cover image */}
            <ScrollReveal className="relative rounded-4xl overflow-hidden h-64 md:h-96 mb-12 shadow-xl img-zoom">
              <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
            </ScrollReveal>

            {/* Challenge + Approach */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <ScrollReveal delay={40}>
                <div className="bg-red-50 border border-red-100 rounded-3xl p-8 h-full">
                  <h3 className="font-bold text-gray-900 mb-3">{s.challenge.heading}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">{s.challenge.body}</p>
                  <ul className="space-y-2.5" role="list">
                    {s.challenge.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <div className="bg-forest-50 border border-forest-100 rounded-3xl p-8 h-full">
                  <h3 className="font-bold text-gray-900 mb-3">{s.approach.heading}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5">{s.approach.body}</p>
                  <ul className="space-y-2.5" role="list">
                    {s.approach.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-forest-600 mt-0.5 shrink-0" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Results */}
            <ScrollReveal>
              <div className="bg-forest-950 rounded-3xl p-8 md:p-10 mb-8">
                <p className="section-eyebrow-light mb-6">Results &amp; Impact</p>
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {s.results.map(({ metric, label }) => (
                    <div key={label} className="text-center">
                      <dt className="text-3xl font-bold text-white font-heading">{metric}</dt>
                      <dd className="text-white/40 text-xs mt-1 tracking-wide">{label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>

            {/* Conclusion */}
            <ScrollReveal>
              <div className="border-l-4 border-gold-400 pl-6 py-2">
                <p className="text-gray-700 leading-relaxed">{s.conclusion}</p>
              </div>
            </ScrollReveal>
          </div>
        </article>
      ))}

      {/* ── CTA ── */}
      <section className="py-24 bg-forest-950 noise-overlay relative" aria-label="Partner CTA">
        <div className="max-w-2xl mx-auto container-px text-center">
          <ScrollReveal>
            <h2 className="text-display-lg font-bold text-white mb-5 text-balance">
              Partner with IK Food Uganda
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Want to understand how we can serve your sourcing needs? Our team
              is ready to discuss.
            </p>
            <Link href="/contact" className="btn-gold">
              Get in Touch
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
