import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Vanilla Insights & Export Resources | IK Food Uganda Blog",
  description:
    "Expert insights on Ugandan vanilla, why Uganda ranks among the top vanilla-producing countries, how it compares to Madagascar and Zanzibar, and practical export guides from IK Food Uganda — one of Uganda's top vanilla companies.",
  keywords: [
    "Uganda vanilla vs Madagascar vanilla",
    "Uganda vanilla vs Zanzibar vanilla",
    "top vanilla producing countries",
    "best vanilla in the world Uganda",
    "vanilla export guide Uganda",
    "why Ugandan vanilla is the best",
    "vanilla farming Uganda",
    "organic vanilla insights",
  ],
  openGraph: {
    title: "Vanilla Insights & Export Resources | IK Food Uganda Blog",
    description: "Expert insights on why Ugandan vanilla rivals Madagascar and Zanzibar, plus export guides and farming articles.",
    url: "https://ikfoodug.com/blog",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/blog" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ikfoodug.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://ikfoodug.com/blog" },
  ],
};

const blogArticlesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "IK Food Uganda Blog",
  description: "Insights on Ugandan vanilla, top vanilla-producing countries, export regulations and organic farming.",
  url: "https://ikfoodug.com/blog",
  publisher: {
    "@type": "Organization",
    name: "IK Food Uganda",
    url: "https://ikfoodug.com",
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "Why Ugandan Vanilla is the Best in the World",
      description: "Uganda's vanillin concentration, traditional sun-curing methods, and unique highland climate combine to produce vanilla that consistently surpasses all others.",
      url: "https://ikfoodug.com/blog/why-ugandan-vanilla-is-the-best",
      datePublished: "2023-04-01",
      author: { "@type": "Organization", name: "IK Food Uganda" },
      keywords: "top vanilla companies worldwide, best vanilla Uganda, Uganda vs Madagascar vanilla",
    },
    {
      "@type": "BlogPosting",
      headline: "The Importance of Vanilla in the Global Food Industry",
      description: "From premium ice cream to fine perfumery, natural vanilla commands a premium that synthetic alternatives can never replicate.",
      url: "https://ikfoodug.com/blog/importance-of-vanilla",
      datePublished: "2022-11-01",
      author: { "@type": "Organization", name: "IK Food Uganda" },
    },
    {
      "@type": "BlogPosting",
      headline: "Navigating International Requirements to Export Vanilla",
      description: "A practical guide to the certifications, compliance steps, and logistics required to successfully export vanilla from Uganda.",
      url: "https://ikfoodug.com/blog/navigating-export-requirements",
      datePublished: "2021-11-01",
      author: { "@type": "Organization", name: "IK Food Uganda" },
    },
  ],
};

const posts = [
  {
    slug: "why-ugandan-vanilla-is-the-best",
    title: "Why Ugandan Vanilla is the Best in the World",
    date: "Apr 14, 2023",
    dateISO: "2023-04-14",
    category: "Organic",
    readTime: "6 min",
    excerpt:
      "Discover what makes Uganda's vanilla superior — from its vanillin concentration to the traditional sun-curing methods that preserve its rich, complex flavour profile.",
    image: "/IMG_4873_converted.avif",
    featured: true,
  },
  {
    slug: "importance-of-vanilla",
    title: "The Importance of Vanilla in the Global Food Industry",
    date: "Nov 2, 2022",
    dateISO: "2022-11-02",
    category: "Natural",
    readTime: "5 min",
    excerpt:
      "From ice cream to perfumery, vanilla is one of the world's most versatile flavourings. We explore its cultural and economic significance.",
    image: "/IMG_7929_converted.avif",
    featured: false,
  },
  {
    slug: "navigating-export-requirements",
    title: "Navigating International Requirements to Export Vanilla",
    date: "Nov 12, 2021",
    dateISO: "2021-11-12",
    category: "Export",
    readTime: "9 min",
    excerpt:
      "A practical guide covering certifications, compliance standards, and logistics required to successfully export vanilla from Uganda to Europe and Asia.",
    image: "/IMG_8876_converted.avif",
    featured: false,
  },
  {
    slug: "sustainable-vanilla-farming",
    title: "Sustainable Vanilla Farming: How We Protect Uganda's Soil",
    date: "Jun 20, 2023",
    dateISO: "2023-06-20",
    category: "Farming",
    readTime: "7 min",
    excerpt:
      "Vanilla demands healthy, rich soil. We share IK Food Uganda's approach to biodynamic cultivation — composting, shade-tree integration, and natural pest management.",
    image: "/IMG_3172_converted.avif",
    featured: false,
  },
  {
    slug: "hass-avocado-export",
    title: "Exporting Hass Avocado from Uganda: A Complete Guide",
    date: "Mar 5, 2023",
    dateISO: "2023-03-05",
    category: "Harvest",
    readTime: "8 min",
    excerpt:
      "Best harvesting windows, post-harvest handling, cold-chain requirements, and EU phytosanitary compliance steps for avocado exporters.",
    image: "/IMG_7889_converted.avif",
    featured: false,
  },
  {
    slug: "robusta-specialty",
    title: "Can Ugandan Robusta Compete in the Specialty Coffee Market?",
    date: "Aug 10, 2022",
    dateISO: "2022-08-10",
    category: "Farming",
    readTime: "6 min",
    excerpt:
      "Uganda's high-altitude, shade-grown Robusta is changing the specialty coffee narrative. We explore its unique profile and growing premium demand.",
    image: "/coffee-plantation.jpg",
    featured: false,
  },
];

const featured = posts.find((p) => p.featured)!;
const regular  = posts.filter((p) => !p.featured);

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticlesJsonLd) }} />
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="Blog hero">
        <Image
          src="/IMG_4873_converted.avif"
          alt="Vanilla beans — IK Food Uganda's blog focuses on organic agriculture"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/20" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <span className="section-eyebrow-light mb-4">Knowledge Hub</span>
          <h1 className="text-display-2xl font-bold text-white text-balance max-w-xl">
            Blog &amp; Resources
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-md">
            Expert insights on organic farming, Ugandan vanilla, and
            sustainable agribusiness.
          </p>
        </div>
      </section>

      {/* ── Featured post ── */}
      <section className="section-y bg-cream map-bg" aria-label="Featured article">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal>
            <span className="section-eyebrow mb-8 block">Featured Article</span>
            <article className="surface-card group overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto min-h-[280px] img-zoom overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill className="object-cover" priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-4 left-4 chip bg-forest-900 text-white">{featured.category}</span>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <time dateTime={featured.dateISO} className="label-tag text-gray-400">{featured.date}</time>
                    <span className="label-tag text-gold-600">{featured.readTime} read</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-forest-950 mb-4 leading-snug group-hover:text-forest-700 transition-colors text-balance">
                    <Link href={`/blog/${featured.slug}`} className="focus-visible:outline-none focus-visible:underline">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                  <Link href={`/blog/${featured.slug}`} className="btn-dark self-start group">
                    Read Article
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ── All articles grid ── */}
      <section className="section-y bg-white map-bg" aria-label="All blog posts">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="mb-12">
            <h2 className="text-display-lg font-bold text-forest-950">All Articles</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 70}>
                <article className="surface-card group flex flex-col h-full">
                  <Link href={`/blog/${post.slug}`}
                    className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 rounded-2xl"
                  >
                    <div className="relative h-52 img-zoom overflow-hidden rounded-t-2xl">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="33vw" />
                      <span className="absolute top-3 left-3 chip bg-forest-900 text-white">{post.category}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <time dateTime={post.dateISO} className="label-tag text-gray-400">{post.date}</time>
                        <span className="label-tag text-gold-600">{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-forest-950 leading-snug line-clamp-2 group-hover:text-forest-700 transition-colors flex-1 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-forest-600 text-sm font-medium mt-auto pt-4 border-t border-gray-100">
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

      {/* ── Media ── */}
      <section id="media" className="section-y bg-parchment map-bg scroll-mt-20" aria-label="Media and press">
        <div className="max-w-7xl mx-auto container-px">
          <ScrollReveal className="max-w-xl mb-12">
            <span className="section-eyebrow">Media</span>
            <h2 className="text-display-lg font-bold text-forest-950 text-balance">
              Press &amp; Media
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              For press enquiries, media assets, or interview requests, contact
              our communications team.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📦", title: "Press Kit",         body: "Company fact sheet, product overview, high-resolution images, and brand guidelines.",    cta: "Download Press Kit" },
              { icon: "📣", title: "Media Enquiries",   body: "Journalists can reach us at sales@ikfooduganda.com for interviews and expert quotes.",   cta: "Send Enquiry" },
              { icon: "🖼️", title: "Photo Gallery",     body: "High-resolution editorial photography available for use with attribution.",              cta: "View Gallery" },
            ].map(({ icon, title, body, cta }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="bg-white border border-forest-100 rounded-3xl p-8 text-center shadow-sm h-full flex flex-col">
                  <div className="text-4xl mb-4" role="img" aria-hidden="true">{icon}</div>
                  <h3 className="font-semibold text-forest-950 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">{body}</p>
                  <Link href="/contact" className="btn-outline-dark text-sm self-center">{cta}</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 bg-forest-950 noise-overlay relative" aria-label="Newsletter signup">
        <div className="max-w-2xl mx-auto container-px text-center">
          <ScrollReveal>
            <span className="section-eyebrow-light mb-4 block">Stay Updated</span>
            <h2 className="text-display-lg font-bold text-white mb-4 text-balance">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/50 text-lg mb-10">
              Organic farming insights, export market updates, and Ugandan
              agriculture news — delivered to your inbox.
            </p>
            <NewsletterForm />
            <p className="text-white/25 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
