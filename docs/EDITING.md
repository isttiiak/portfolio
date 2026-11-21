# Editing the portfolio

Everything is file-based: edit, commit, push to `main`, and Vercel redeploys in about a minute.
No local setup? Press `.` on the GitHub repo to open github.dev, a browser editor that can commit.

```bash
git add -A && git commit -m "describe the change" && git push
```

Run `npm run build` before pushing structural changes — MDX frontmatter typos surface at build time.

## Where everything lives

| I want to change… | Edit |
| --- | --- |
| Name, roles, email, links, tagline, public repo count | `lib/data/site.ts` |
| Project cards | `lib/data/projects.ts` |
| About-section paragraphs | `components/sections/About.tsx` |
| Stat counters and the journey timeline | `lib/data/timeline.ts` |
| Skills grid and marquee | `lib/data/skills.ts` |
| A case study | `content/projects/<slug>.mdx` |
| A blog post | `content/blog/<slug>.mdx` |
| CV (both versions + the site's resume) | `cv/src/body.tex`, then `make` in `cv/` |

## Add a project

Add an object to the `projects` array in `lib/data/projects.ts`:

```ts
{
  slug: "my-new-app",              // unique, used in the URL
  title: "My New App",
  kind: "software",                // "data" projects also appear in the Data & ML section
  summary: "One or two sentences shown on the card.",
  tags: ["Next.js", "PostgreSQL", "Docker"],
  live: "https://my-new-app.vercel.app",   // optional — shows the LIVE badge
  github: "https://github.com/isttiiak/my-new-app",
  caseStudy: true,                 // links the card to /projects/<slug> if the .mdx exists
  metrics: [{ value: "1.2K", label: "users" }],   // optional
  year: "2026",
},
```

To feature it in the horizontal gallery, add its slug to the `featuredProjects` list at the bottom of the same file.

## Add a case study

Create `content/projects/<slug>.mdx` (filename = the slug). It appears at `/projects/<slug>`:

```mdx
---
title: "My New App"
description: "One line under the title and in search results."
year: "2026"
role: "Solo developer"
stack: ["Next.js", "PostgreSQL", "Docker"]
live: "https://my-new-app.vercel.app"
github: "https://github.com/isttiiak/my-new-app"
order: 5
architecture:
  - layer: "Frontend"
    tech: "Next.js + Tailwind CSS"
  - layer: "Database"
    tech: "PostgreSQL"
---

## The problem
## Key features
## Results
## Challenges
## What I learned
```

Markdown, links, code and tables all work.

## Write a blog post

Create `content/blog/<slug>.mdx`; posts are listed newest first:

```mdx
---
title: "What I learned deploying Airflow on a free tier"
description: "Shown on the blog card and in search results."
date: "2026-08-15"
tags: ["data engineering", "airflow"]
---

Intro paragraph, then `##` sections.
```

## Timeline, counters and skills

- `lib/data/timeline.ts` — `timeline` is the journey section (`accent: true` gives the glowing dot); `counters` are the four About stats.
- The public repo count is `publicRepos` in `lib/data/site.ts` and feeds both the counter and the gallery link.
- `lib/data/skills.ts` — `skillGroups` is the four-card grid, `marqueeSkills` the scrolling strip.

## The CV (LaTeX)

Edit **only** `cv/src/body.tex`; the two `.tex` wrappers just switch the photo on or off.

```bash
cd cv && make
```

`make` builds both PDFs into `cv/` and copies the no-photo version to `public/istiak-islam-resume.pdf`.
It needs a TeX install (`brew install --cask mactex-no-gui`, then open a new terminal); without one,
upload `cv/` to [overleaf.com](https://overleaf.com). If it fails, the error names a line —
usually an unescaped `%`, `$`, `&` or `#` (write `\%`, `\$`, `\&`, `\#`).

## Services

- **Hosting:** Vercel builds every push to `main`.
- **Contact form:** set `NEXT_PUBLIC_WEB3FORMS_KEY` (free key from [web3forms.com](https://web3forms.com)) in Vercel's environment variables. Without it the form opens the visitor's mail app.
- **Analytics (optional):** set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to a GA4 `G-…` ID; the tag stays off while it's unset.
- **Search Console:** add the `https://istiak.is-a.dev` property at [search.google.com/search-console](https://search.google.com/search-console) and submit `https://istiak.is-a.dev/sitemap.xml`.
- **Domain:** `url` in `lib/data/site.ts` drives the canonical URL, sitemap and social cards — update it if the domain changes.
