"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/data/site";
import { prefersReducedMotion } from "@/lib/motion";

const SEEN_KEY = "portfolio_preloader_seen";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  // gone = unmount instantly with no exit animation (skip paths and hidden tabs,
  // where rAF-driven exit animations can never play)
  const [gone, setGone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      sessionStorage.getItem(SEEN_KEY) ||
      prefersReducedMotion() ||
      document.visibilityState === "hidden"
    ) {
      sessionStorage.setItem(SEEN_KEY, "1");
      setGone(true);
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let raf: number;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        sessionStorage.setItem(SEEN_KEY, "1");
        setTimeout(() => setVisible(false), 250);
      }
    };
    raf = requestAnimationFrame(step);

    // Backgrounded mid-intro: drop the overlay instantly — its exit
    // animation could never play in a hidden tab
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        sessionStorage.setItem(SEEN_KEY, "1");
        setGone(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (gone) return null;

  const letters = site.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-coal"
          aria-hidden="true"
        >
          <div className="flex overflow-hidden font-display text-3xl font-bold tracking-tight text-cream sm:text-5xl">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.08 + i * 0.035, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className={letter === " " ? "w-3" : undefined}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 font-mono text-sm text-ember"
          >
            {count}%
          </motion.p>
          <div className="mt-3 h-px w-40 overflow-hidden bg-line">
            <div
              className="h-full bg-ember transition-[width] duration-100 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
