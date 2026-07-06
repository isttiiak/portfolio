import { Marquee } from "@/components/fx/Marquee";
import { site } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="py-10 opacity-[0.35]" aria-hidden="true">
        <Marquee durationSeconds={26}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="whitespace-nowrap px-8 font-display text-7xl font-bold tracking-tight sm:text-8xl"
              style={{ WebkitTextStroke: "1.5px #44403c", color: "transparent" }}
            >
              ISTIAK ISLAM — SOFTWARE · DATA —
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-6 py-6 sm:flex-row sm:px-10">
        <p className="font-mono text-xs text-smoke">
          © {year} {site.name} · Dhaka, Bangladesh
        </p>
        <p className="font-mono text-xs text-smoke">
          built with <span className="text-ember">Next.js</span> + <span className="text-ember">GSAP</span> · deployed on{" "}
          <span className="text-ember">Vercel</span>
        </p>
      </div>
    </footer>
  );
}
