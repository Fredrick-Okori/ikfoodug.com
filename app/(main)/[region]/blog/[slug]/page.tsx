import type { Metadata } from "next";
import { RegionLink as Link } from "@/components/RegionProvider";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { supabase, type BlogPost } from "@/lib/supabase";
import { getRegion, regionAlternates } from "@/lib/regions";

export const dynamic = "force-dynamic";

/**
 * Renders article text from the admin. Plain paragraphs separated by blank lines; a block starting
 * with "## " is a heading, and a block whose lines all start with "- " is a bullet list.
 * Posts written without these markers render exactly as typed.
 */
function ArticleBody({ content }: { content: string }) {
  const hasMarkup = /^(## |- )/m.test(content);
  if (!hasMarkup) {
    return <div className="whitespace-pre-wrap text-[1.0625rem] leading-[1.8] text-forest-900/80">{content}</div>;
  }
  const blocks = content.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-6 text-[1.0625rem] leading-[1.8] text-forest-900/80">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="!mt-14 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-forest-950 sm:text-4xl">
              {block.slice(3)}
            </h2>
          );
        }
        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={i}>
              {lines.map((line, j) => (
                <li key={j} className="relative border-t border-forest-950/15 py-3 pl-6 last:border-b">
                  <span aria-hidden className="absolute left-0 top-[1.35rem] h-2 w-2 rounded-full bg-gold-500" />
                  {line.slice(2)}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="whitespace-pre-line">{block}</p>;
      })}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ region: string; slug: string }> }): Promise<Metadata> {
  const { region, slug } = await params;
  const { data } = await supabase.from("blog_posts").select("title,excerpt").eq("slug", slug).single();
  if (!data) return { title: "Post Not Found | IK Food Uganda" };
  return {
    title: `${data.title} | IK Food Uganda Blog`,
    description: data.excerpt ?? undefined,
    alternates: regionAlternates(getRegion(region).code, `/blog/${slug}`),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ region: string; slug: string }> }) {
  const { region, slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts").select("*").eq("slug", slug).eq("published", true).single();

  if (!post) notFound();
  const p = post as BlogPost;
  const date = new Date(p.published_at ?? p.created_at).toLocaleDateString(getRegion(region).locale, { day: "numeric", month: "long", year: "numeric" });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt ?? undefined,
    datePublished: p.published_at ?? p.created_at,
    image: p.image_url ? (p.image_url.startsWith("http") ? p.image_url : `https://ikfoodug.com${p.image_url}`) : undefined,
    author: { "@type": "Organization", name: "IK Food Uganda", url: "https://ikfoodug.com" },
    publisher: { "@type": "Organization", name: "IK Food Uganda", url: "https://ikfoodug.com" },
    mainEntityOfPage: `https://ikfoodug.com/blog/${p.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PageHero
        title={p.title}
        image={p.image_url || undefined}
        alt={p.title}
        aside={
          <Link href="/blog" className="link-line">
            All articles
          </Link>
        }
      >
        <p className="text-sm font-bold text-forest-900/55">
          {p.category} · <time dateTime={p.published_at ?? p.created_at}>{date}</time> · {p.read_time} read
        </p>
      </PageHero>

      <article className="bg-cream text-forest-950">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
          {p.excerpt && (
            <p data-reveal className="mb-12 text-2xl font-bold leading-snug tracking-[-0.02em]">{p.excerpt}</p>
          )}
          {p.content && <ArticleBody content={p.content} />}
          <div className="mt-16 border-t border-forest-950/15 pt-8">
            <Link href="/blog" className="link-line">Back to all articles</Link>
          </div>
        </div>
      </article>
    </>
  );
}
