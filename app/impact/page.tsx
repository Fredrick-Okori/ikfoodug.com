import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Globe2, Users, ShieldCheck, Sprout, Award } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Impact | IK Food Uganda",
  description:
    "IK Food Uganda — established 2015 — is a premier exporter of premium organic agricultural products committed to sustainable farming, farmer empowerment, and world-class quality standards.",
  openGraph: {
    title: "Our Impact | IK Food Uganda",
    description: "How IK Food Uganda is transforming Uganda's agricultural sector through sustainable practices, farmer empowerment, and premium organic exports.",
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
  { value: "25 MT",  label: "Annual harvest",      sub: "Of export-grade organic produce" },
  { value: "100%",   label: "Organically grown",   sub: "Certified EU & Asian standards" },
  { value: "2015",   label: "Year founded",         sub: "A decade of excellence" },
];

const pillars = [
  {
    Icon: Sprout,
    title: "Sustainable Farming",
    body: "We champion biodynamic and organic cultivation methods that protect Uganda's biodiverse soils, reduce chemical inputs, and ensure every farm remains productive for future generations.",
  },
  {
    Icon: Users,
    title: "Farmer Empowerment",
    body: "Fair trade pricing, hands-on agronomic training, and direct market access give our 3,000+ smallholder partners the tools to build lasting livelihoods — not just seasonal income.",
  },
  {
    Icon: ShieldCheck,
    title: "World-Class Quality",
    body: "Every shipment meets rigorous EU and Asian phytosanitary requirements. Our on-site quality labs, cold-chain logistics, and HORTIFRESH membership ensure zero compromises.",
  },
  {
    Icon: Globe2,
    title: "Global Market Access",
    body: "By securing full export licences and international certifications, we open doors that individual farmers cannot — connecting Uganda's highlands directly to premium buyers worldwide.",
  },
];

const products = [
  { name: "Vanilla",       note: "1.5–2.5% vanillin — world-leading grade",   image: "/IMG_4873_converted.avif" },
  { name: "Cocoa",         note: "Naturally fermented fine-flavour beans",     image: "/IMG_4160_converted.avif" },
  { name: "Coffee",        note: "High-altitude Fine Robusta",                 image: "/coffee-plantation.jpg" },
  { name: "Hass Avocado",  note: "Class I export grade, year-round",           image: "/IMG_7889_converted.avif" },
  { name: "Garden Eggs",   note: "Phytosanitary certified, vibrant & firm",    image: "/IMG_3062_converted.avif" },
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
              A decade of sustainable agriculture, farmer empowerment, and premium organic exports — from Uganda&apos;s highlands to global markets.
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
              &ldquo;IK Food Uganda Ltd, established in 2015, is a premier exporter of high-quality agricultural products, including vanilla, cocoa, coffee, Hass avocados, and garden eggs. The company is committed to sustainable farming practices, offering organic products that appeal to health-conscious consumers. Their mission to uphold world-class quality standards positions them as a trusted partner in the international market.&rdquo;
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
              Five Products, One Standard of Excellence
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

      {/* ── Sustainability image split ── */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="Sustainability commitment">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <ScrollReveal className="relative h-[480px] rounded-4xl overflow-hidden img-zoom shadow-2xl">
              <Image
                src="/IMG_7889_converted.avif"
                alt="Organic farming practices at IK Food Uganda"
                fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" aria-hidden="true" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 glass-card px-5 py-4">
                <p className="text-[10px] text-white/45 uppercase tracking-widest mb-1">Certification</p>
                <p className="text-lg font-bold font-heading text-white leading-none">HORTIFRESH</p>
                <p className="text-xs text-gold-400 mt-1">Member since 2022</p>
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
                  { icon: Leaf,       text: "Biodynamic and organic methods that protect Uganda's biodiverse soils." },
                  { icon: Users,      text: "Fair trade pricing and agronomic training for 3,000+ farmer partners." },
                  { icon: Award,      text: "Full export licences, EU organic certification, and HORTIFRESH membership." },
                  { icon: ShieldCheck, text: "Zero shipment rejection rate — every batch meets international standards." },
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

      {/* ── CTA ── */}
      <section className="py-24 bg-cream map-bg relative" aria-label="Partner CTA">
        <div className="max-w-3xl mx-auto container-px text-center">
          <ScrollReveal>
            <span className="section-eyebrow">Partner With Us</span>
            <h2 className="text-display-lg font-bold text-forest-950 mb-5 text-balance">
              Be Part of the Impact
            </h2>
            <p className="text-forest-950/55 text-lg mb-10 leading-relaxed">
              Every order placed with IK Food Uganda directly supports Ugandan farmers, sustainable land practices, and the growth of Uganda&apos;s organic agricultural sector.
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
