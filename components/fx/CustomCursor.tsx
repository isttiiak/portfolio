"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    setEnabled(true);
    document.body.dataset.customCursor = "true";

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")
      );
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      delete document.body.dataset.customCursor;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[250] h-2 w-2 rounded-full bg-ember"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[249] rounded-full border border-ember/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          opacity: pressed ? 0.5 : 1,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hovering ? "rgba(249, 115, 22, 0.12)" : "rgba(249, 115, 22, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
