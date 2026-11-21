"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/fx/TiltCard";
import { ArrowUpRightIcon, ExternalLinkIcon, GithubIcon } from "@/components/ui/icons";
import { featuredProjects, type Project } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

function ProjectCard({ project, hasCaseStudy }: { project: Project; hasCaseStudy: boolean }) {
  return (
    <TiltCard className="h-full w-[85vw] max-w-[460px] shrink-0 sm:w-[460px]">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-char">
        <div className="flex items-center gap-1.5 border-b border-line px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-copper/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone/40" />
          <span className="ml-2 font-mono text-[11px] text-smoke">
            {project.kind === "data" ? "pipeline" : "app"} · {project.year}
          </span>
          <span className="ml-auto flex items-center gap-3 text-stone">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="transition-colors hover:text-ember"
              >
                <GithubIcon width={16} height={16} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="transition-colors hover:text-ember"
              >
                <ExternalLinkIcon width={16} height={16} />
              </a>
            )}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl font-bold text-cream">{project.title}</h3>
            {project.live && (
              <span className="flex items-center gap-1.5 rounded-full border border-ember/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                live
              </span>
            )}
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">{project.summary}</p>

          {project.metrics && (
            <div className="mt-5 flex gap-6">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-lg font-bold text-gradient-warm">{metric.value}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-smoke">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-coal px-2.5 py-1 font-mono text-[11px] text-stone">
                {tag}
              </span>
            ))}
          </div>

          {hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[13px] text-ember transition-colors hover:text-amber"
            >
              read case study
              <ArrowUpRightIcon width={14} height={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export function FeaturedProjects({ caseStudySlugs }: { caseStudySlugs: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-24 overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="02" eyebrow="featured work" title="Things I've shipped" />
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto px-6 pb-6 sm:px-10 lg:w-max lg:overflow-visible lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-24"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {featuredProjects.map((project) => (
          <div key={project.slug} style={{ scrollSnapAlign: "center" }} className="flex">
            <ProjectCard
              project={project}
              hasCaseStudy={project.caseStudy && caseStudySlugs.includes(project.slug)}
            />
          </div>
        ))}

        <div className="flex w-[70vw] max-w-[380px] shrink-0 items-center justify-center">
          <a
            href={`${site.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line text-stone transition-all group-hover:border-ember group-hover:text-ember">
              <ArrowUpRightIcon width={24} height={24} />
            </span>
            <span className="font-mono text-sm text-stone transition-colors group-hover:text-cream">
              all {site.publicRepos} repos on GitHub
            </span>
          </a>
        </div>
      </div>

      <p className="mt-4 px-6 text-center font-mono text-[11px] text-smoke sm:px-10 lg:hidden">
        ← swipe →
      </p>
    </section>
  );
}
