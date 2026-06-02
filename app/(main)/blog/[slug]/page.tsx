import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabase, type BlogPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from("blog_posts").select("title,excerpt").eq("slug", slug).single();
  if (!data) return { title: "Post Not Found | IK Food Uganda" };
  return {
    title: `${data.title} | IK Food Uganda Blog`,
    description: data.excerpt ?? undefined,
    alternates: { canonical: `https://ikfoodug.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts").select("*").eq("slug", slug).eq("published", true).single();

  if (!post) notFound();
  const p = post as BlogPost;
  const date = new Date(p.published_at ?? p.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <section className="relative min-h-[55vh] flex items-end pb-20 pt-32 overflow-hidden">
        {p.image_url && (
          <Image src={p.image_url} alt={p.title} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/20" />
        <div className="relative z-10 max-w-4xl mx-auto container-px w-full">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="chip bg-forest-900 text-white">{p.category}</span>
            <span className="label-tag text-white/50">{p.read_time} read</span>
          </div>
          <h1 className="text-display-xl font-bold text-white text-balance max-w-2xl">{p.title}</h1>
          <time dateTime={p.published_at ?? p.created_at} className="text-white/40 text-sm mt-4 block">{date}</time>
        </div>
      </section>

      <section className="section-y bg-white map-bg">
        <div className="max-w-3xl mx-auto container-px">
          {p.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-10 border-l-4 border-gold-400 pl-6 italic">{p.excerpt}</p>
          )}
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[1.05rem]">
            {p.content}
          </div>
          <div className="mt-16 pt-8 border-t border-gray-100">
            <Link href="/blog" className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-800 font-medium text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
