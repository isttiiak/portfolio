import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { CountUp } from "@/components/fx/CountUp";
import { counters } from "@/lib/data/timeline";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 sm:px-10">
      <SectionHeading index="01" eyebrow="about" title="Engineer across the stack and the pipeline" />

      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-[15px] leading-relaxed text-stone">
          <SectionReveal>
            <p>
              I&apos;m a computer science graduate from{" "}
              <span className="text-cream">BRAC University</span>{" "}based in Dhaka, working at the
              intersection of software engineering and data. I like shipping things end to end — the
              React frontend, the API behind it, and the data pipeline underneath.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p>
              On the software side, I&apos;ve built and deployed{" "}
              <span className="text-cream">three products running live in production</span>{" "}— a
              finance app with an AI layer, an Islamic productivity platform, and a watchlist tracker
              — all on free-tier infrastructure that I architected to stay fast and reliable.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p>
              On the data side, my undergraduate thesis built a{" "}
              <span className="text-cream">Bayesian adaptive rating system</span>{" "}for e-commerce, and
              I completed the government-backed{" "}
              <span className="text-cream">Certification in Data Science (ITS 507)</span>{" "}at BRAC
              University in 2026 — admitted through a competitive national exam — covering advanced
              ML, big data, data pipelines, and NLP. My capstone took a Kaggle-scale NLP regression problem from raw data to a served
              FastAPI model.
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-2 content-start gap-4">
          {counters.map((counter, i) => (
            <SectionReveal key={counter.label} delay={0.1 + i * 0.08}>
              <div className="rounded-xl border border-line bg-char p-6 transition-colors hover:border-ember/50">
                <p className="font-display text-4xl font-bold text-cream">
                  <CountUp value={counter.value} suffix={counter.suffix} className="text-gradient-warm" />
                </p>
                <p className="mt-2 text-[13px] leading-snug text-stone">{counter.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
