import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MdxContent } from "@/components/mdx/MdxContent";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon } from "@/components/ui/icons";
import { getDoc, getDocSlugs } from "@/lib/mdx";

export function generateStaticParams() {
  return getDocSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("projects", slug);
  if (!doc) return { title: "Project not found" };
  return {
    title: doc.meta.title,
    description: doc.meta.description,
    openGraph: { title: doc.meta.title, description: doc.meta.description },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc("projects", slug);
  if (!doc) notFound();

  const { meta, content } = doc;

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:px-10">
        <SectionReveal>
          <Link
            href="/#projects"
            className="group mb-10 inline-flex items-center gap-2 font-mono text-[13px] text-stone transition-colors hover:text-ember"
          >
            <ArrowLeftIcon width={14} height={14} className="transition-transform group-hover:-translate-x-1" />
            back to projects
          </Link>

          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ember">
            case study · {meta.year}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-stone">{meta.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-xl border border-line bg-char/60 px-6 py-4">
            {meta.role && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-smoke">role</p>
                <p className="mt-1 text-sm text-cream">{meta.role}</p>
              </div>
            )}
            <div className="ml-auto flex items-center gap-3">
              {meta.github && (
                <a
                  href={meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-line px-4 py-2 font-mono text-[13px] text-stone transition-colors hover:border-ember hover:text-amber"
                >
                  <GithubIcon width={14} height={14} />
                  code
                </a>
              )}
              {meta.live && (
                <a
                  href={meta.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-ember px-4 py-2 font-mono text-[13px] font-semibold text-coal transition-colors hover:bg-amber"
                >
                  <ExternalLinkIcon width={14} height={14} />
                  live site
                </a>
              )}
            </div>
          </div>

          {meta.stack && (
            <div className="mt-5 flex flex-wrap gap-2">
              {meta.stack.map((item) => (
                <span key={item} className="rounded-md bg-char px-2.5 py-1 font-mono text-[11px] text-stone">
                  {item}
                </span>
              ))}
            </div>
          )}

          {meta.architecture && (
            <div className="mt-10">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ember">
                architecture
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {meta.architecture.map((item) => (
                  <div
                    key={item.layer}
                    className="rounded-xl border border-line bg-char p-4 transition-colors hover:border-ember/50"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                      {item.layer}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-cream">{item.tech}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <article className="mt-14">
            <MdxContent source={content} />
          </article>
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
