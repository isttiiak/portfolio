"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// The active instance, so other components scroll through Lenis instead of
// fighting it with native smooth scroll
let activeLenis: Lenis | null = null;

export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
