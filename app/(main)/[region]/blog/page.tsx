import type { Metadata } from "next";
import { getRegion, withRegion } from "@/lib/regions";
import { localize } from "@/lib/localize";
import Image from "next/image";
import { RegionLink as Link } from "@/components/RegionProvider";
import PageHero from "@/components/PageHero";
import NewsletterForm from "@/components/NewsletterForm";
import { supabase, type BlogPost } from "@/lib/supabase";

const metadata: Metadata = {
  title: "Vanilla Insights & Export Resources | IK Food Uganda Blog",
  description:
    "Expert insights on Ugandan vanilla, why Uganda ranks among the top vanilla-producing countries, how it compares to Madagascar and Zanzibar, and practical export guides from IK Food Uganda — one of Uganda's top vanilla companies.",
  keywords: [
    "Uganda vanilla vs Madagascar vanilla",
    "Uganda vanilla vs Zanzibar vanilla",
    "top vanilla producing countries",
    "top vanilla exporters in Uganda",
    "vanilla exporters in Uganda",
    "Uganda vanilla exporters",
    "best vanilla in the world Uganda",
    "vanilla export guide Uganda",
    "why Ugandan vanilla is the best",
    "vanilla farming Uganda",
    "natural vanilla insights",
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
  description: "Insights on Ugandan vanilla, top vanilla-producing countries, export regulations and natural farming.",
  url: "https://ikfoodug.com/blog",
  publisher: {
    "@type": "Organization",
    name: "IK Food Uganda",
    url: "https://ikfoodug.com",
  },
  blogPost: [],
};

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  return withRegion(metadata, getRegion(region).code, "/blog");
}

export default async function BlogPage({ params }: { params: Promise<{ region: string }> }) {
  const r = getRegion((await params).region);
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const dbPosts = (data ?? []) as BlogPost[];

  const posts = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: new Date(p.published_at ?? p.created_at).toLocaleDateString(r.locale, { day: "numeric", month: "short", year: "numeric" }),
    dateISO: p.published_at ?? p.created_at,
    category: p.category,
    readTime: p.read_time,
    excerpt: p.excerpt ?? "",
    // Posts without a cover (null or an empty string) fall back to a stock vanilla photo.
    image: p.image_url || "/IMG_4873_converted.avif",
    featured: p.featured,
  }));

  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const regular = posts.filter((p) => p !== featured);

  return localize(
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticlesJsonLd) }} />

      <PageHero
        title={<>Blog &amp; resources<span className="text-[#dccba0]">.</span></>}
        image="/IMG_4873_converted.avif"
        alt="Vanilla beans, the focus of IK Food Uganda's blog"
      >
        Notes on natural farming, Ugandan vanilla and sustainable agribusiness.
      </PageHero>

      {posts.length === 0 ? (
        <section className="bg-cream text-forest-950">
          <div className="mx-auto max-w-7xl px-5 py-32 text-center sm:px-8 lg:px-12">
            <p className="text-2xl font-extrabold tracking-[-0.03em]">No articles yet.</p>
            <p className="mt-3 text-forest-900/60">Add the first post from the admin dashboard.</p>
          </div>
        </section>
      ) : (
        <>
          {featured && (
            <section className="bg-cream text-forest-950" aria-label="Featured article">
              <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
                <article className="group grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
                  <Link href={`/blog/${featured.slug}`} data-clip className="relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                    />
                  </Link>
                  <div>
                    <p data-reveal className="text-sm font-bold text-forest-900/55">
                      {featured.category} · <time dateTime={featured.dateISO}>{featured.date}</time> · {featured.readTime} read
                    </p>
                    <h2 data-split className="h-display mt-5 text-[clamp(2.25rem,4.5vw,4rem)]">
                      <Link href={`/blog/${featured.slug}`} className="transition-colors hover:text-gold-600">{featured.title}</Link>
                    </h2>
                    <p data-reveal className="mt-6 text-lg leading-relaxed text-forest-900/75">{featured.excerpt}</p>
                    <div data-reveal className="mt-8">
                      <Link href={`/blog/${featured.slug}`} className="link-line">Read the article</Link>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {regular.length > 0 && (
            <section className="bg-parchment text-forest-950" aria-labelledby="all-title">
              <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
                <h2 id="all-title" data-split className="h-section">All articles.</h2>
                <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {regular.map((post) => (
                    <article key={post.slug} data-card className="group">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ebdfc0]">
                          <Image src={post.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                        </div>
                        <p className="mt-5 text-sm font-bold text-forest-900/55">
                          {post.category} · <time dateTime={post.dateISO}>{post.date}</time>
                        </p>
                        <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.03em] transition-colors group-hover:text-gold-600">
                          {post.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-base leading-relaxed text-forest-900/70">{post.excerpt}</p>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Media */}
      <section id="media" className="scroll-mt-8 bg-cream text-forest-950" aria-labelledby="media-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-32">
          <div>
            <h2 id="media-title" data-split className="h-display text-[clamp(2.5rem,5.5vw,4.75rem)]">Press &amp; media.</h2>
            <p data-reveal className="mt-6 max-w-sm text-lg leading-relaxed text-forest-900/70">
              For press enquiries, media assets or interview requests, contact our communications team.
            </p>
          </div>
          <ul>
            {[
              { title: "Press kit",       body: "Company fact sheet, product overview, high-resolution images and brand guidelines.", cta: "Request the press kit", href: "/contact" },
              { title: "Media enquiries", body: `Journalists can reach us at ${r.email} for interviews and expert quotes.`,          cta: "Send an enquiry",       href: "/contact" },
              { title: "Photo gallery",   body: "Editorial photography from our farms and operations, available with attribution.", cta: "View the gallery",      href: "/gallery" },
            ].map(({ title, body, cta, href }) => (
              <li key={title} data-rule className="relative grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                <div data-rule-text>
                  <h3 className="text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{title}</h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-forest-900/70">{body}</p>
                </div>
                <Link data-rule-text href={href} className="link-line shrink-0 self-start sm:self-end">{cta}</Link>
              </li>
            ))}
            <li aria-hidden className="h-px bg-forest-950/20" />
          </ul>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-forest-950 text-cream" aria-labelledby="newsletter-title">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:px-12 lg:py-32">
          <div>
            <h2 id="newsletter-title" data-split className="h-display text-[clamp(2.75rem,6.5vw,5.75rem)]">
              Get the harvest letter<span className="text-[#dccba0]">.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-parchment/65">
              Farming insights, export market updates and Ugandan agriculture news. No spam, unsubscribe anytime.
            </p>
          </div>
          <div data-reveal>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>,
    r.code,
  );
}
