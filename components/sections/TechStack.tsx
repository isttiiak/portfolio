import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { Marquee } from "@/components/fx/Marquee";
import { marqueeSkills, skillGroups } from "@/lib/data/skills";

function MarqueeRow({ items }: { items: string[] }) {
  return (
    <>
      {items.map((skill) => (
        <span key={skill} className="flex items-center whitespace-nowrap font-mono text-lg text-stone">
          <span className="px-6">{skill}</span>
          <span className="text-ember">◆</span>
        </span>
      ))}
    </>
  );
}

export function TechStack() {
  const half = Math.ceil(marqueeSkills.length / 2);
  const firstRow = marqueeSkills.slice(0, half);
  const secondRow = marqueeSkills.slice(half);

  return (
    <section id="stack" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading index="04" eyebrow="toolbox" title="Tech I work with" />
      </div>

      <div
        aria-hidden="true"
        className="space-y-4 border-y border-line py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <Marquee durationSeconds={34}>
          <MarqueeRow items={firstRow} />
        </Marquee>
        <Marquee reverse durationSeconds={38}>
          <MarqueeRow items={secondRow} />
        </Marquee>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <SectionReveal key={group.label} delay={i * 0.08} className="h-full">
            <div className="h-full rounded-2xl border border-line bg-char p-6 transition-colors hover:border-ember/50">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-coal px-2.5 py-1.5 font-mono text-[12px] text-stone transition-colors hover:text-amber"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
