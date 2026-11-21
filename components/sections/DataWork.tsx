import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { PipelineSVG } from "@/components/sections/PipelineSVG";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";
import { dataProjects } from "@/lib/data/projects";
import { hasCaseStudyPage } from "@/lib/mdx";

export function DataWork() {
  return (
    <section id="data" className="relative scroll-mt-24 border-y border-line bg-char/40 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="03" eyebrow="data & machine learning" title="From raw data to served models" scramble />

        <SectionReveal className="mb-16 rounded-2xl border border-line bg-coal/60 p-6 sm:p-10">
          <PipelineSVG />
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dataProjects.map((project, i) => (
            <SectionReveal key={project.slug} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-coal p-6 transition-colors hover:border-ember/50">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-cream">{project.title}</h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="mt-1 text-stone transition-colors hover:text-ember"
                    >
                      <GithubIcon width={16} height={16} />
                    </a>
                  )}
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">{project.summary}</p>

                {project.metrics && (
                  <div className="mt-5 flex gap-6 border-t border-line pt-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="font-display text-lg font-bold text-gradient-warm">{metric.value}</p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-smoke">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-md bg-char px-2.5 py-1 font-mono text-[11px] text-stone">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.caseStudy && hasCaseStudyPage(project.slug) && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group mt-5 inline-flex items-center gap-1.5 font-mono text-[13px] text-ember transition-colors hover:text-amber"
                  >
                    read case study
                    <ArrowUpRightIcon
                      width={14}
                      height={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
