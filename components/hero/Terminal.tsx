"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion";

interface Line {
  prompt: boolean;
  text: string;
  color?: string;
}

const SCRIPT: Line[] = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "istiak islam — dhaka, bangladesh", color: "text-stone" },
  { prompt: true, text: "cat ./focus.txt" },
  { prompt: false, text: "full-stack products · ML pipelines · data systems", color: "text-stone" },
  { prompt: true, text: "./status --now" },
  { prompt: false, text: "● building — open to SWE & data engineering roles", color: "text-amber" },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setLines(SCRIPT);
      setDone(true);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const typeLine = () => {
      if (cancelled) return;
      if (lineIndex >= SCRIPT.length) {
        setDone(true);
        return;
      }
      const line = SCRIPT[lineIndex];

      if (!line.prompt) {
        setLines((prev) => [...prev, line]);
        lineIndex += 1;
        timeouts.push(setTimeout(typeLine, 260));
        return;
      }

      if (charIndex <= line.text.length) {
        setTyping(line.text.slice(0, charIndex));
        charIndex += 1;
        timeouts.push(setTimeout(typeLine, 38 + Math.random() * 45));
      } else {
        setLines((prev) => [...prev, line]);
        setTyping("");
        charIndex = 0;
        lineIndex += 1;
        timeouts.push(setTimeout(typeLine, 300));
      }
    };

    timeouts.push(setTimeout(typeLine, 600));
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="w-full max-w-md overflow-hidden rounded-xl border border-line bg-char/80 shadow-2xl shadow-black/40 backdrop-blur-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-copper/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone/40" />
        <span className="ml-2 font-mono text-[11px] text-smoke">istiak@dev — zsh</span>
      </div>
      <div className="min-h-[172px] px-4 py-3 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <p key={i} className={line.prompt ? "text-cream" : (line.color ?? "text-stone")}>
            {line.prompt && <span className="text-ember">$ </span>}
            {line.text}
          </p>
        ))}
        {!done && (
          <p className="text-cream">
            <span className="text-ember">$ </span>
            {typing}
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-ember" style={{ animation: "blink 1s step-end infinite" }} />
          </p>
        )}
        {done && (
          <p className="text-cream">
            <span className="text-ember">$ </span>
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-ember" style={{ animation: "blink 1s step-end infinite" }} />
          </p>
        )}
      </div>
    </div>
  );
}
