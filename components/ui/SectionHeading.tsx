import { TextReveal } from "@/components/fx/TextReveal";
import { TextScramble } from "@/components/fx/TextScramble";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  scramble?: boolean;
}

export function SectionHeading({ index, eyebrow, title, scramble = false }: SectionHeadingProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ember">
        <span className="text-smoke">{index}</span> · {eyebrow}
      </p>
      {scramble ? (
        <h2 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl lg:text-6xl">
          <TextScramble text={title} />
        </h2>
      ) : (
        <TextReveal
          as="h2"
          text={title}
          className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl lg:text-6xl"
        />
      )}
    </div>
  );
}
