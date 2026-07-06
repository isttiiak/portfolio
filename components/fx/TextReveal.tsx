"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({ text, className, delay = 0, as = "span" }: TextRevealProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom${i < words.length - 1 ? " mr-[0.28em]" : ""}`}
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%", rotate: 3 },
              visible: {
                y: 0,
                rotate: 0,
                transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
