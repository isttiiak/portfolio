"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data/site";
import { prefersReducedMotion } from "@/lib/motion";

export function RoleTicker() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }

    const role = site.roles[roleIndex];
    let delay = deleting ? 40 : 75;

    if (!deleting && text === role) {
      delay = 2200;
    } else if (deleting && text === "") {
      delay = 350;
    }

    const timeout = setTimeout(() => {
      if (!deleting && text === role) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % site.roles.length);
      } else {
        setText(role.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  if (reduced) {
    return <span className="text-ember">{site.roles[0]}</span>;
  }

  return (
    <span className="text-ember">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[0.12em] bg-amber" style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
}
