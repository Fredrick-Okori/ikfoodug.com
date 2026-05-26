import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Globe2, Users, ShieldCheck, Sprout, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Impact | IK Food Uganda",
  description:
    "IK Food Uganda, established in 2015, is a premier exporter of premium natural agricultural products committed to sustainable farming, farmer empowerment, and world-class quality standards.",
  openGraph: {
    title: "Our Impact | IK Food Uganda",
    description: "How IK Food Uganda is transforming Uganda's agricultural sector through sustainable practices, farmer empowerment, and premium natural exports.",
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
  { value: "3,000+", label: "Smallholder farmers", sub: "Directly partnered across Uganda" },
  { value: "25 MT",  label: "Annual harvest",      sub: "Of export-grade natural produce" },
  { value: "100%",   label: "Naturally grown",   sub: "Certified EU & Asian standards" },
  { value: "2015",   label: "Year founded",         sub: "A decade of excellence" },
];

const pillars = [
  {
    Icon: Sprout,
    title: "Sustainable Farming",
    body: "We champion biodynamic and natural cultivation methods that protect Uganda's biodiverse soils, reduce chemical inputs, and ensure every farm remains productive for future generations.",
  },
  {
    Icon: Users,
    title: "Farmer Empowerment",
    body: "Fair trade pricing, hands-on agronomic training, and direct market access give our 3,000+ smallholder partners the tools to build lasting livelihoods, not just seasonal income.",
  },
  {
    Icon: ShieldCheck,
    title: "World-Class Quality",
    body: "Every shipment meets rigorous EU and Asian phytosanitary requirements. Our on-site quality labs and cold-chain logistics ensure zero compromises.",
  },
  {
    Icon: Globe2,
    title: "Global Market Access",
    body: "By securing full export licences and international certifications, we open doors that individual farmers cannot, connecting Uganda's highlands directly to premium buyers worldwide.",
  },
];

const products = [
  { name: "Vanilla",       note: <><strong>1.5–2.5% vanillin</strong>, world-leading grade</>,  image: "/IMG_4873_converted.avif" },
];

export default function ImpactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="Impact hero">
        <Image
          src="/IMG_3172_converted.avif"
          alt="IK Food Uganda farmers working in the field"
          fill className="object-cover object-center" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/15" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <div className="max-w-2xl">
            <span className="section-eyebrow-light mb-4">Our Impact</span>
            <h1 className="text-display-2xl font-bold text-white text-balance mb-6">
              Growing Uganda.<br />Feeding the World.
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              A decade of sustainable agriculture, farmer empowerment, and premium natural exports, from <strong>Uganda&apos;s highlands</strong> to <strong>global markets</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission statement ── */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="Mission statement">
        <div className="max-w-5xl mx-auto container-px text-center">
          <ScrollReveal>
            <span className="section-eyebrow-light mb-6">Who We Are</span>
            <blockquote className="text-[clamp(1.15rem,2.5vw,1.5rem)] text-white/80 leading-relaxed font-sans italic border-l-4 border-gold-400 pl-8 text-left max-w-4xl mx-auto">
              &ldquo;IK Food Uganda Ltd, established in 2015, is a premier exporter of high-quality natural vanilla, committed to sustainable farming practices and world-class quality standards. Their mission to deliver premium Ugandan vanilla positions them as a trusted partner in the international market.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-3 pl-8">
              <div className="w-10 h-px bg-gold-400" aria-hidden="true" />
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">IK Food Uganda Ltd</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section className="section-y bg-cream map-bg" aria-label="Impact statistics">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow">By the Numbers</span>
            <h2 className="text-display-lg font-bold text-forest-950 text-balance">
              A Decade of Measurable Impact
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, sub }, i) => (
              <ScrollReveal key={label} delay={i * 80}>
                <div className="surface-card p-8 text-center group">
                  <p className="text-[3rem] font-bold font-heading text-gold-500 leading-none mb-2 group-hover:text-gold-400 transition-colors">
                    {value}
                  </p>
                  <p className="font-semibold text-forest-950 mb-1">{label}</p>
                  <p className="text-xs text-gray-500 leading-snug">{sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact pillars ── */}
      <section className="section-y bg-white map-bg" aria-label="Impact pillars">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow">How We Create Impact</span>
            <h2 className="text-display-lg font-bold text-forest-950 text-balance">
              Four Pillars of Responsible Growth
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ Icon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="surface-card p-7 h-full group">
                  <div className="w-12 h-12 rounded-2xl bg-gold-400/15 flex items-center justify-center mb-5 group-hover:bg-gold-400 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-gold-500 group-hover:text-forest-950 transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-forest-950 text-lg mb-3 font-heading">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products impact ── */}
      <section className="section-y bg-parchment map-bg" aria-label="Products">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow">What We Export</span>
            <h2 className="text-display-lg font-bold text-forest-950 text-balance">
              Premium Vanilla, One Standard of Excellence
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map(({ name, note, image }, i) => (
              <ScrollReveal key={name} delay={i * 70}>
                <div className="group relative rounded-3xl overflow-hidden aspect-[3/4]">
                  <Image
                    src={image} alt={name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-bold text-white font-heading text-base leading-tight mb-1">{name}</p>
                    <p className="text-white/50 text-[11px] leading-snug">{note}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Communities ── */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="Vanilla farming communities">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow-light">Where It Begins</span>
            <h2 className="text-display-lg font-bold text-white text-balance">
              The Communities Behind Our Vanilla
            </h2>
            <p className="text-white/50 mt-4 leading-relaxed">
              Our vanilla is grown in <strong>Uganda&apos;s lush highlands</strong>, places like <strong>Ibanda</strong>, by smallholder farmers who have cultivated these crops for generations.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Large left — Ibanda community */}
            <ScrollReveal className="relative rounded-4xl overflow-hidden h-[480px] lg:h-auto img-zoom">
              <Image
                src="/ibanda.avif"
                alt="Ibanda community, vanilla farming region, Uganda"
                fill className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="chip bg-gold-400 text-forest-950 font-semibold mb-3 inline-flex">Ibanda Region</span>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">Ibanda, Western Uganda</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                  One of our primary vanilla-sourcing regions, with rich volcanic soils and an equatorial climate that produce beans with exceptional <strong>vanillin concentration</strong>.
                </p>
              </div>
            </ScrollReveal>

            {/* Right — three images + text */}
            <div className="flex flex-col gap-6">
              <ScrollReveal delay={80} className="relative rounded-4xl overflow-hidden h-48 img-zoom">
                <Image
                  src="/Screenshot 2026-05-06 at 15.31.13_converted.avif"
                  alt="IK Food Uganda farmer inspecting vanilla vines"
                  fill className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="chip bg-gold-400/20 text-gold-400 border border-gold-400/30 mb-1.5 inline-flex">Farm Inspection</span>
                  <p className="text-white font-semibold text-sm">Farmer checking vine health</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={140} className="relative rounded-4xl overflow-hidden h-48 img-zoom">
                <Image
                  src="/vanilla_bean_green.avif"
                  alt="Fresh green vanilla beans on the vine in Uganda"
                  fill className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="chip bg-gold-400/20 text-gold-400 border border-gold-400/30 mb-2 inline-flex">Hand-Harvested</span>
                  <p className="text-white font-semibold">Fresh vanilla beans on the vine</p>
                  <p className="text-white/45 text-xs mt-1">Picked at peak maturity for maximum vanillin</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="border border-white/10 rounded-4xl p-8 h-full">
                  <p className="label-tag text-gold-400 mb-4">Our Community Commitment</p>
                  <div className="space-y-4">
                    {[
                      { stat: "3,000+", desc: "Farmer families directly supported across Uganda" },
                      { stat: "Fair Price", desc: "Guaranteed minimum farm-gate pricing every season" },
                      { stat: "Training", desc: "Hands-on agronomic and post-harvest handling support" },
                    ].map(({ stat, desc }) => (
                      <div key={stat} className="flex items-start gap-4 pb-4 border-b border-white/8 last:border-0 last:pb-0">
                        <p className="text-gold-400 font-bold font-heading text-lg leading-none shrink-0 w-24">{stat}</p>
                        <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── From Field to Export ── */}
      <section className="section-y bg-cream map-bg" aria-label="Harvest and processing journey">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="text-center max-w-xl mx-auto mb-16">
            <span className="section-eyebrow">The Journey</span>
            <h2 className="text-display-lg font-bold text-forest-950 text-balance">
              From Field to Export
            </h2>
            <p className="text-forest-950/55 mt-4 leading-relaxed">
              Every bean passes through careful hands, harvested, sorted, processed, and packed to world-class standards before leaving Uganda.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-5">
            <ScrollReveal delay={0} className="group relative rounded-3xl overflow-hidden aspect-[4/3] img-zoom">
              <Image
                src="/Screenshot 2026-05-06 at 14.42.53_converted.avif"
                alt="Women sorting and grading fresh vanilla beans at IK Food Uganda"
                fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="chip bg-gold-400 text-forest-950 font-semibold mb-2 inline-flex">Step 1</span>
                <p className="text-white font-semibold leading-tight">Sorting &amp; Grading</p>
                <p className="text-white/50 text-xs mt-1">Careful hand-sorting for export grade</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={90} className="group relative rounded-3xl overflow-hidden aspect-[4/3] img-zoom">
              <Image
                src="/Screenshot 2026-05-06 at 14.46.21_converted.avif"
                alt="Community group processing harvested vanilla outdoors in Uganda"
                fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="chip bg-gold-400 text-forest-950 font-semibold mb-2 inline-flex">Step 2</span>
                <p className="text-white font-semibold leading-tight">Community Processing</p>
                <p className="text-white/50 text-xs mt-1">Farmers work together at collection points</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180} className="group relative rounded-3xl overflow-hidden aspect-[4/3] img-zoom">
              <Image
                src="/372838c3-c504-48e1-b9b1-3b34442d01d2_converted.avif"
                alt="IK Food Uganda team with packaged vanilla ready for export"
                fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="chip bg-gold-400 text-forest-950 font-semibold mb-2 inline-flex">Step 3</span>
                <p className="text-white font-semibold leading-tight">Export Ready</p>
                <p className="text-white/50 text-xs mt-1">Packaged to international standards</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Sustainability image split ── */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="Sustainability commitment">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <ScrollReveal className="flex flex-col gap-5">
              <div className="relative h-80 rounded-4xl overflow-hidden img-zoom shadow-2xl">
                <Image
                  src="/IMG_7889_converted.avif"
                  alt="Natural farming practices at IK Food Uganda"
                  fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" aria-hidden="true" />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 glass-card px-5 py-4">
                  <p className="text-[10px] text-white/45 uppercase tracking-widest mb-1">Export</p>
                  <p className="text-lg font-bold font-heading text-white leading-none">Certified</p>
                  <p className="text-xs text-gold-400 mt-1">Full phytosanitary clearance</p>
                </div>
              </div>
              <div className="relative h-52 rounded-4xl overflow-hidden img-zoom shadow-xl">
                <Image
                  src="/79a461de-c579-4d35-bc23-b1e5ba5f51f3_converted.avif"
                  alt="Close-up of vanilla vines with green beans in Uganda's highlands"
                  fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="chip bg-gold-400/20 text-gold-400 border border-gold-400/30 inline-flex">100% Natural Vanilla Vines</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <span className="section-eyebrow-light">Sustainability</span>
              <h2 className="text-display-lg font-bold text-white mb-6 text-balance leading-tight">
                Committed to the Land &amp; the People
              </h2>
              <div className="w-10 h-px bg-gold-400 mb-8" aria-hidden="true" />
              <div className="space-y-5 mb-10">
                {[
                  { icon: Leaf,       text: "Biodynamic and natural methods that protect Uganda's biodiverse soils." },
                  { icon: Users,      text: "Fair trade pricing and agronomic training for 3,000+ farmer partners." },
                  { icon: Award,      text: "Full export licences and phytosanitary clearance for international shipment." },
                  { icon: ShieldCheck, text: "Zero shipment rejection rate. Every batch meets international standards." },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gold-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gold-400" aria-hidden="true" />
                    </div>
                    <p className="text-white/65 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-gold group">
                Our Full Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Why Buy From Us ── */}
      <section className="section-y bg-parchment map-bg" aria-label="Why buy from IK Food Uganda">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Text col */}
            <ScrollReveal>
              <span className="section-eyebrow">Make a Difference</span>
              <h2 className="text-display-lg font-bold text-forest-950 mb-6 text-balance leading-tight">
                Why You Should Buy From Us
              </h2>
              <div className="h-rule mb-6" aria-hidden="true" />
              <p className="text-gray-600 leading-relaxed mb-5">
                When you buy from IK Food Uganda, you are not only purchasing
                <strong> premium Ugandan vanilla</strong> and agricultural products. You are
                supporting communities and changing lives.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Your support helps create jobs for youths, provides income for
                elderly farmers and single mothers, and gives rural communities
                a reliable market for their products. We also train and empower
                local farmers and young people with skills in farming, curing,
                processing, and business development.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                Every purchase contributes to sustainable agriculture, quality
                production, and a stronger future for hundreds of families in
                Uganda.
              </p>
              <Link href="/contact" className="btn-dark group">
                Start an Order
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </ScrollReveal>

            {/* Impact cards col */}
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Users,
                  title: "Youth Employment",
                  body: "Every order directly creates jobs for young Ugandans, giving them income, purpose, and a stake in their country's agricultural future.",
                },
                {
                  icon: Sprout,
                  title: "Income for Farmers",
                  body: "Elderly farmers and single mothers receive fair, reliable income through our guaranteed farm-gate pricing and direct market partnerships.",
                },
                {
                  icon: Award,
                  title: "Skills & Training",
                  body: "We invest in people, teaching modern farming, curing, processing, and business development skills that last a lifetime.",
                },
                {
                  icon: Globe2,
                  title: "Sustainable Agriculture",
                  body: "Your purchase helps protect Uganda's land, strengthen rural livelihoods, and build lasting social and economic change for communities.",
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <ScrollReveal key={title} delay={i * 70}>
                  <div className="flex items-start gap-5 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-gold-400/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-forest-950 mb-1">{title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-cream map-bg relative" aria-label="Partner CTA">
        <div className="max-w-3xl mx-auto container-px text-center">
          <ScrollReveal>
            <span className="section-eyebrow">Partner With Us</span>
            <h2 className="text-display-lg font-bold text-forest-950 mb-5 text-balance">
              Be Part of the Impact
            </h2>
            <p className="text-forest-950/55 text-lg mb-10 leading-relaxed">
              Every order placed with IK Food Uganda directly supports Ugandan farmers, sustainable land practices, and the growth of Uganda&apos;s natural agricultural sector.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="btn-dark group">
                View Our Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline-dark">
                Get in Touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
