"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  durationSeconds?: number;
  className?: string;
}

export function Marquee({ children, reverse = false, durationSeconds = 30, className }: MarqueeProps) {
  return (
    <div className={`group flex overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex w-max shrink-0 items-center [animation-play-state:running] group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
