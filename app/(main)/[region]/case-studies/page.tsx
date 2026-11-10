import type { Metadata } from "next";
import { getRegion, withRegion } from "@/lib/regions";
import { localize } from "@/lib/localize";
import Image from "next/image";
import PageHero from "@/components/PageHero";

const metadata: Metadata = {
  title: "Vanilla Export Case Studies | IK Food Uganda",
  description:
    "Real-world case studies from IK Food Uganda — one of the top vanilla companies in Uganda — on exporting premium natural vanilla and fresh produce to Europe and Asia.",
  keywords: [
    "Uganda vanilla export case study",
    "top vanilla exporter Uganda success",
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "natural vanilla export Africa",
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
      "How IK Food Uganda built a scalable export system for natural produce, overcoming regulatory, logistical, and quality challenges to serve European and Asian markets reliably.",
    challenge: {
      heading: "The Challenge",
      body: "Ugandan exporters face stringent EU phytosanitary requirements, cold-chain gaps, and complex certification demands. Many small agribusinesses suffer rejected shipments and financial losses navigating these barriers.",
      points: [
        "Meeting EU maximum residue limits (MRLs) for pesticides",
        "Maintaining cold-chain from farm gate to airfreight",
        "Securing HACCP, natural, and export certifications",
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
        "Full phytosanitary clearance for regulatory compliance",
        "Dedicated export documentation and compliance team",
      ],
    },
    results: [
      { metric: "20,000+", label: "Farmers in our network" },
      { metric: "700 MT",  label: "Annual harvest volume" },
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
      { metric: "100%",      label: "Naturally certified" },
    ],
    conclusion:
      "Uganda's vanilla has the quality to command world attention. What it needs is the right production systems, market access, and farmer empowerment — exactly what IK Food Uganda provides.",
    image: "/IMG_4873_converted.avif",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  return withRegion(metadata, getRegion(region).code, "/case-studies");
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ region: string }> }) {
  const r = getRegion((await params).region);
  return localize(
    <>
      <PageHero
        title={<>Case studies<span className="text-[#dccba0]">.</span></>}
        image="/IMG_3172_converted.avif"
        alt="Vanilla farmland, the focus of IK Food Uganda's case studies"
        imageClassName="object-cover object-bottom"
      >
        How IK Food Uganda handles the realities of natural export agriculture: the challenges, the approach, and what
        came of it.
      </PageHero>

      {/* ── Index ── */}
      <section className="bg-cream text-forest-950" aria-label="Case study index">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <ul>
            {studies.map((s) => (
              <li key={s.id} data-rule>
                <a href={`#${s.id}`} className="group relative grid gap-3 py-8 md:grid-cols-[4rem_1fr_auto] md:items-center md:gap-8">
                  <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                  <span data-rule-text className="text-sm font-bold tabular-nums text-forest-900/50">{s.num}</span>
                  <span data-rule-text className="block">
                    <span className="block text-sm font-bold text-forest-900/55">{s.category} · {s.readTime} read</span>
                    <span className="mt-2 block text-[clamp(1.6rem,3.4vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] transition-colors duration-300 group-hover:text-gold-600">
                      {s.title}
                    </span>
                  </span>
                  <span aria-hidden className="hidden text-3xl font-extrabold text-forest-950/30 transition duration-500 group-hover:translate-y-1 group-hover:text-gold-600 md:block">&darr;</span>
                </a>
              </li>
            ))}
          </ul>
          <span className="block h-px bg-forest-950/20" />
        </div>
      </section>

      {/* ── Full studies ── */}
      {studies.map((s, si) => (
        <article key={s.id} id={s.id} className={`scroll-mt-8 ${si % 2 === 0 ? "bg-parchment" : "bg-cream"} text-forest-950`} aria-labelledby={`${s.id}-title`}>
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <p data-reveal className="text-sm font-bold text-forest-900/55">{s.num} · {s.category} · {s.readTime} read</p>
            <h2 id={`${s.id}-title`} data-split className="h-display mt-5 max-w-5xl text-[clamp(2.5rem,5.5vw,5rem)]">{s.title}</h2>
            <p data-reveal className="mt-8 max-w-3xl text-xl leading-relaxed text-forest-900/75">{s.overview}</p>

            <div data-clip data-parallax className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0] lg:aspect-[21/9]">
              <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(min-width: 1280px) 1200px, 100vw" />
            </div>

            <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-12">
              {[s.challenge, s.approach].map((block) => (
                <div key={block.heading}>
                  <h3 data-reveal className="text-3xl font-extrabold tracking-[-0.04em]">{block.heading}</h3>
                  <p data-reveal className="mt-4 text-base leading-relaxed text-forest-900/75">{block.body}</p>
                  <ul className="mt-8">
                    {block.points.map((pt) => (
                      <li key={pt} data-rule className="relative py-3.5 text-base text-forest-900/85">
                        <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/15" />
                        <span data-rule-text className="block">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="mt-20 rounded-[1.75rem] bg-forest-950 px-6 py-10 text-cream sm:px-10 sm:py-12">
              <p className="text-sm font-bold text-parchment/50">Results</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
                {s.results.map(({ metric, label }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="mt-3 text-sm text-parchment/60">{label}</dt>
                    <dd className="order-first text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-none tracking-[-0.04em]">{metric}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p data-reveal className="mt-14 max-w-4xl text-2xl font-bold leading-snug tracking-[-0.02em] sm:text-3xl">
              {s.conclusion}
            </p>
          </div>
        </article>
      ))}
    </>,
    r.code,
  );
}
