"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

export function CountUp({ value, suffix = "", prefix = "", decimals = 0, durationMs = 1800, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Server HTML carries the real value (crawlers, no-JS); once mounted, reset to 0
  // so the count-up can play when the number scrolls into view
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    armed.current = true;
    setDisplay(0);
  }, []);

  useEffect(() => {
    if (!inView || !armed.current) return;

    const start = performance.now();
    let raf: number;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
