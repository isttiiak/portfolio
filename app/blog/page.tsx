import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { getAllDocs } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, data pipelines, and machine learning.",
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllDocs("blog");

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10">
        <SectionReveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ember">writing</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Notes from the build
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-stone">
            Software engineering, data pipelines, and things I learned the hard way.
          </p>
        </SectionReveal>

        <div className="mt-14 space-y-5">
          {posts.map((post, i) => (
            <SectionReveal key={post.meta.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.meta.slug}`}
                className="group block rounded-2xl border border-line bg-char p-7 transition-colors hover:border-ember/50"
              >
                <p className="font-mono text-xs text-smoke">{formatDate(post.meta.date)}</p>
                <h2 className="mt-2 flex items-start justify-between gap-4 font-display text-2xl font-bold text-cream transition-colors group-hover:text-amber">
                  {post.meta.title}
                  <ArrowUpRightIcon
                    width={18}
                    height={18}
                    className="mt-1.5 shrink-0 text-stone transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                  />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone">{post.meta.description}</p>
                {post.meta.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.meta.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-coal px-2.5 py-1 font-mono text-[11px] text-stone">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </SectionReveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
