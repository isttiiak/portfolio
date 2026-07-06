"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, rgba(249, 115, 22, ${glowOpacity}), transparent 65%)`;

  const onMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice() || prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * maxTilt);
    rotateX.set((0.5 - py) * 2 * maxTilt);
    glowX.set(px * 100);
    glowY.set(py * 100);
    glowOpacity.set(0.13);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className={`relative ${className ?? ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  );
}
