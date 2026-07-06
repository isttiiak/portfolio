"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ParticleCanvas } from "@/components/hero/ParticleCanvas";
import { Terminal } from "@/components/hero/Terminal";
import { RoleTicker } from "@/components/hero/RoleTicker";
import { Magnetic } from "@/components/fx/Magnetic";
import { Orbs } from "@/components/fx/Orbs";
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon, TelegramIcon } from "@/components/ui/icons";
import { site } from "@/lib/data/site";

const nameLetters = site.name.split("");
const lastNameStart = site.name.indexOf("Islam");

export function Hero() {
  // If the preloader already ran this session, start the intro immediately
  const [base] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("portfolio_preloader_seen") ? 0.15 : 1.7
  );

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <Orbs />
      <ParticleCanvas />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-32 sm:px-10 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base, duration: 0.6 }}
            className="mb-5 font-mono text-sm tracking-[0.2em] text-amber"
          >
            $ hello_world — I&apos;m
          </motion.p>

          <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-cream">
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true" className="flex flex-wrap">
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: base + 0.15 + i * 0.045, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  className={
                    letter === " "
                      ? "w-[0.35em]"
                      : i >= lastNameStart
                        ? "text-gradient-warm inline-block"
                        : "inline-block"
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.9, duration: 0.6 }}
            className="mt-6 font-display text-xl text-cream sm:text-2xl"
          >
            <RoleTicker />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 1.1, duration: 0.6 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-stone"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 1.3, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-block rounded-lg bg-ember px-7 py-3.5 text-sm font-semibold text-coal transition-colors hover:bg-amber"
              >
                View projects
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-block rounded-lg border border-line px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-ember hover:text-amber"
              >
                Get in touch
              </a>
            </Magnetic>

            <div className="ml-1 flex items-center gap-4 text-stone">
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-ember">
                <GithubIcon />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-ember">
                <LinkedinIcon />
              </a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="transition-colors hover:text-ember">
                <TelegramIcon />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-ember">
                <MailIcon />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 1.4, duration: 0.7 }}
          className="hidden justify-self-end lg:block"
        >
          <Terminal />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1.9 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-smoke transition-colors hover:text-ember"
      >
        <span style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }} className="block">
          <ArrowDownIcon width={22} height={22} />
        </span>
      </motion.a>
    </section>
  );
}
