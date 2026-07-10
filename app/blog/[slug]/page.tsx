import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MdxContent } from "@/components/mdx/MdxContent";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { getDoc, getDocSlugs } from "@/lib/mdx";

export function generateStaticParams() {
  return getDocSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("blog", slug);
  if (!doc) return { title: "Post not found" };
  return {
    title: doc.meta.title,
    description: doc.meta.description,
    openGraph: { title: doc.meta.title, description: doc.meta.description, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("blog", slug);
  if (!doc) notFound();

  const { meta, content } = doc;
  const date = meta.date
    ? new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10">
        <SectionReveal>
          <Link
            href="/blog"
            className="group mb-10 inline-flex items-center gap-2 font-mono text-[13px] text-stone transition-colors hover:text-ember"
          >
            <ArrowLeftIcon width={14} height={14} className="transition-transform group-hover:-translate-x-1" />
            all posts
          </Link>

          <p className="mb-4 font-mono text-xs text-smoke">{date}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            {meta.title}
          </h1>
          {meta.tags && (
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-char px-2.5 py-1 font-mono text-[11px] text-stone">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <article className="mt-12">
            <MdxContent source={content} />
          </article>
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
