import type { Metadata } from "next";
import { RegionLink as Link } from "@/components/RegionProvider";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { supabase, type BlogPost } from "@/lib/supabase";
import { getRegion, regionAlternates } from "@/lib/regions";

export const dynamic = "force-dynamic";

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

  return (
    <>
      <PageHero
        title={p.title}
        image={p.image_url || undefined}
        alt={p.title}
        aside={
          <Link href="/blog" className="link-line-light">
            All articles
          </Link>
        }
      >
        <p className="text-sm font-bold text-parchment/55">
          {p.category} · <time dateTime={p.published_at ?? p.created_at}>{date}</time> · {p.read_time} read
        </p>
      </PageHero>

      <article className="bg-cream text-forest-950">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
          {p.excerpt && (
            <p data-reveal className="mb-12 text-2xl font-bold leading-snug tracking-[-0.02em]">{p.excerpt}</p>
          )}
          <div className="whitespace-pre-wrap text-[1.0625rem] leading-[1.8] text-forest-900/80">{p.content}</div>
          <div className="mt-16 border-t border-forest-950/15 pt-8">
            <Link href="/blog" className="link-line">Back to all articles</Link>
          </div>
        </div>
      </article>
    </>
  );
}
