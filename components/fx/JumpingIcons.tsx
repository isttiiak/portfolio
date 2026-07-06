"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SiPython,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiFirebase,
  SiSupabase,
  SiTailwindcss,
  SiNextdotjs,
  SiPandas,
  SiScikitlearn,
  SiFastapi,
  SiNumpy,
  SiVercel,
} from "react-icons/si";
import { prefersReducedMotion } from "@/lib/motion";

const ICON_POOL = [
  SiPython,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiFirebase,
  SiSupabase,
  SiTailwindcss,
  SiNextdotjs,
  SiPandas,
  SiScikitlearn,
  SiFastapi,
  SiNumpy,
  SiVercel,
];

const WARM_COLORS = ["#f97316", "#fbbf24", "#c2410c", "#fdba74", "#faf6f0", "#fb923c"];

const SLOT_COUNT = 4;
const JUMP_SECONDS = 1.6;
const SWAP_MS = 3200;

interface SlotState {
  icon: number;
  color: string;
}

function randomColor(exclude: string) {
  const options = WARM_COLORS.filter((c) => c !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

function initialSlots(): SlotState[] {
  return Array.from({ length: SLOT_COUNT }, (_, i) => ({
    icon: i * 5, // spread across the pool
    color: WARM_COLORS[i % WARM_COLORS.length],
  }));
}

export function JumpingIcons() {
  const [slots, setSlots] = useState<SlotState[]>(initialSlots);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    setAnimate(true);

    // Each slot swaps on its own offset so they never all change at once
    const timers = Array.from({ length: SLOT_COUNT }, (_, slot) =>
      setInterval(() => {
        setSlots((prev) => {
          const inUse = new Set(prev.map((s) => s.icon));
          let next = Math.floor(Math.random() * ICON_POOL.length);
          while (inUse.has(next)) {
            next = Math.floor(Math.random() * ICON_POOL.length);
          }
          return prev.map((s, i) =>
            i === slot ? { icon: next, color: randomColor(s.color) } : s
          );
        });
      }, SWAP_MS + slot * 700)
    );

    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <div className="flex items-end justify-center gap-10 sm:gap-14" aria-hidden="true">
      {slots.map((slot, i) => {
        const Icon = ICON_POOL[slot.icon];
        return (
          <div key={i} className="relative flex flex-col items-center">
            <motion.div
              animate={
                animate
                  ? { y: [0, -26, 0], rotate: [0, 360] }
                  : undefined
              }
              transition={{
                duration: JUMP_SECONDS,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={slot.icon}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                  style={{ color: slot.color }}
                >
                  <Icon size={34} />
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <motion.span
              className="mt-4 h-1.5 w-8 rounded-full bg-ember/30 blur-[2px]"
              animate={animate ? { scaleX: [1, 0.45, 1], opacity: [0.5, 0.2, 0.5] } : undefined}
              transition={{
                duration: JUMP_SECONDS,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
