"use client";

import { JumpingIcons } from "@/components/fx/JumpingIcons";
import { site } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="py-14">
        <JumpingIcons />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-6 py-6 sm:flex-row sm:px-10">
        <p className="font-mono text-xs text-smoke">
          © {year} {site.name} · {site.location}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group font-mono text-xs text-smoke transition-colors hover:text-ember"
        >
          back to top <span className="inline-block transition-transform group-hover:-translate-y-0.5">↑</span>
        </button>
      </div>
    </footer>
  );
}
