"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { site } from "@/lib/data/site";

const warmTheme = {
  dark: ["#1c1917", "#7c2d12", "#c2410c", "#f97316", "#fbbf24"],
};

export function GithubActivity() {
  // Calendar skeleton is non-deterministic — render client-side only to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="github" className="relative scroll-mt-24 border-y border-line bg-char/40 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="06" eyebrow="open source" title="Always committing" />

        <SectionReveal>
          <div className="min-h-[180px] overflow-x-auto rounded-2xl border border-line bg-coal p-6 text-stone sm:p-8">
            {mounted && (
              <GitHubCalendar
                username={site.handle}
                colorScheme="dark"
                theme={warmTheme}
                blockSize={11}
                blockMargin={3.5}
                fontSize={12}
              />
            )}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[13px] text-ember transition-colors hover:text-amber"
          >
            github.com/{site.handle}
            <ArrowUpRightIcon
              width={14}
              height={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
