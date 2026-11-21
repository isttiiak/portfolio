"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { timeline } from "@/lib/data/timeline";

export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="journey" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 sm:px-10">
      <SectionHeading index="05" eyebrow="journey" title="How I got here" />

      <div ref={listRef} className="relative ml-2 sm:ml-4">
        <div aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-line" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-amber via-ember to-copper"
        />

        <div className="space-y-14">
          {timeline.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.05} className="relative pl-10 sm:pl-14">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 ${
                  item.accent ? "border-ember bg-coal shadow-[0_0_12px_rgba(249,115,22,0.6)]" : "border-line bg-char"
                }`}
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">{item.period}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-cream">{item.title}</h3>
              <p className="mt-1 text-sm text-smoke">{item.place}</p>
              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-stone">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] text-ember transition-colors hover:text-amber"
                >
                  {item.link.label}
                  <ArrowUpRightIcon
                    width={14}
                    height={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
