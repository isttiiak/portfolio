"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/fx/Magnetic";
import { DownloadIcon, MenuIcon, XIcon } from "@/components/ui/icons";
import { site } from "@/lib/data/site";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#data", label: "data" },
  { href: "/#stack", label: "stack" },
  { href: "/#journey", label: "journey" },
  { href: "/blog", label: "blog" },
  { href: "/#contact", label: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-all duration-400 ${
        scrolled ? "border-b border-line bg-coal/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="font-mono text-sm text-ember transition-colors hover:text-amber">
          ~/istiak
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group font-mono text-[13px] text-stone transition-colors hover:text-cream"
            >
              {link.label}
              <span className="block h-px max-w-0 bg-ember transition-all duration-300 group-hover:max-w-full" />
            </Link>
          ))}
          <Magnetic strength={0.25}>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-ember/60 px-4 py-2 font-mono text-[13px] text-amber transition-colors hover:bg-ember/10"
            >
              <DownloadIcon width={14} height={14} />
              resume
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="text-cream lg:hidden"
        >
          <MenuIcon />
        </button>
      </nav>
    </header>

      {/* Overlay must live OUTSIDE the header: its backdrop-blur creates a
          containing block that would trap this fixed element inside the bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[210] flex flex-col bg-coal lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-mono text-sm text-ember">~/istiak</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-cream">
                <XIcon width={24} height={24} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-6 px-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-bold text-cream transition-colors hover:text-ember"
                  >
                    <span className="mr-3 font-mono text-base text-ember">0{i + 1}.</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + links.length * 0.06 }}
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 rounded-lg border border-ember/60 px-6 py-3 font-mono text-base text-amber"
              >
                <DownloadIcon width={16} height={16} />
                resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
