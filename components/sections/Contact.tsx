"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { Magnetic } from "@/components/fx/Magnetic";
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import { site } from "@/lib/data/site";

type Status = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill it, humans never see it
    if (data.get("website")) return;

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      data.append("access_key", WEB3FORMS_KEY);
      data.append("subject", `Portfolio enquiry from ${data.get("name")}`);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 sm:px-10">
      <SectionHeading index="07" eyebrow="contact" title="Let's build something" />

      <div className="grid gap-14 lg:grid-cols-2">
        <SectionReveal>
          <p className="max-w-md text-[15px] leading-relaxed text-stone">
            I&apos;m currently open to <span className="text-cream">software engineering</span>{" "}and{" "}
            <span className="text-cream">data engineering</span>{" "}roles — full-time, contract, or
            interesting collaborations. My inbox is always open.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 text-cream transition-colors hover:text-amber"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ember transition-colors group-hover:border-ember">
                <MailIcon width={18} height={18} />
              </span>
              <span className="font-mono text-sm">{site.email}</span>
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-cream transition-colors hover:text-amber"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ember transition-colors group-hover:border-ember">
                <GithubIcon width={18} height={18} />
              </span>
              <span className="font-mono text-sm">github.com/{site.handle}</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-cream transition-colors hover:text-amber"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ember transition-colors group-hover:border-ember">
                <LinkedinIcon width={18} height={18} />
              </span>
              <span className="font-mono text-sm">linkedin.com/in/{site.handle}</span>
            </a>
            <div className="flex items-center gap-4 text-stone">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ember">
                <MapPinIcon width={18} height={18} />
              </span>
              <span className="font-mono text-sm">{site.location} · UTC+6</span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <form onSubmit={onSubmit} className="space-y-5">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-smoke">
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-line bg-char px-4 py-3 text-sm text-cream placeholder-smoke/60 outline-none transition-colors focus:border-ember"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-smoke">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full rounded-lg border border-line bg-char px-4 py-3 text-sm text-cream placeholder-smoke/60 outline-none transition-colors focus:border-ember"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider text-smoke">
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={6}
                placeholder="Tell me about the role or project…"
                className="w-full resize-y rounded-lg border border-line bg-char px-4 py-3 text-sm text-cream placeholder-smoke/60 outline-none transition-colors focus:border-ember"
              />
            </div>

            <div className="flex items-center gap-5">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-lg bg-ember px-8 py-3.5 text-sm font-semibold text-coal transition-colors hover:bg-amber disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </Magnetic>
              {status === "sent" && (
                <p role="status" className="font-mono text-sm text-amber">
                  ✓ sent — I&apos;ll reply soon
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="font-mono text-sm text-copper">
                  something broke — email me directly
                </p>
              )}
            </div>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
