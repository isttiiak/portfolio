# istiak.dev — Portfolio

Personal portfolio of **Istiak Islam** — software engineer & data engineer.
Dark-first, warm-toned, animation-heavy, built entirely on free tools.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP ScrollTrigger · Lenis · MDX

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes statically generated)
npm run lint
```

## Content editing — no code required

| What | Where |
|---|---|
| Name, roles, links, tagline | `lib/data/site.ts` |
| Project cards (home page) | `lib/data/projects.ts` |
| Skills / marquee | `lib/data/skills.ts` |
| Timeline & stat counters | `lib/data/timeline.ts` |
| Case studies | `content/projects/*.mdx` (frontmatter + markdown) |
| Blog posts | `content/blog/*.mdx` — add a file, it appears automatically |
| Resume | replace `public/resume.pdf` |

## Deploy (Vercel, free)

1. Push this repo to GitHub (private is fine).
2. [vercel.com](https://vercel.com) → **Add New Project** → import `portfolio` → framework auto-detects Next.js → **Deploy**.
3. Every push to `main` auto-deploys.

### Contact form (Web3Forms, free — 250 submissions/month)

1. Get a free access key at [web3forms.com](https://web3forms.com) using `isttiiak@gmail.com`.
2. Locally: put it in `.env.local` → `NEXT_PUBLIC_WEB3FORMS_KEY=...`
3. On Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_WEB3FORMS_KEY` → redeploy.

Until the key is set, the form falls back to opening the visitor's email client (mailto) — nothing breaks.

### Custom domain (optional)

Vercel → Project → Settings → Domains. Then update `url` in `lib/data/site.ts` so sitemap/OG metadata point at the real domain (currently `https://istiak.dev`).

## Notes

- `myinfo/` (raw CVs) is gitignored — local source material only.
- All animations respect `prefers-reduced-motion`; custom cursor and particle canvas are disabled on touch devices.
- The GitHub contribution calendar reads the public API for `isttiiak` — no token needed.
