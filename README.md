<div align="center">

# Istiak Islam · Portfolio

**Software engineer & data engineer from Dhaka, Bangladesh.**
Full-stack products, end-to-end ML pipelines, and the case studies behind them.

[**istiak.is-a.dev →**](https://istiak.is-a.dev) &nbsp;·&nbsp; also on Vercel: [isttiiak.vercel.app](https://isttiiak.vercel.app)

<a href="https://istiak.is-a.dev"><img src="https://istiak.is-a.dev/opengraph-image" alt="Istiak Islam, Software Engineer · Data Engineer" width="820"></a>

</div>

---

## What's inside

| Section | What it shows |
| --- | --- |
| **Hero** | Mouse-reactive particle field, a typing terminal (`$ whoami`) and a rotating role ticker |
| **Featured work** | A scroll-pinned horizontal gallery of shipped products, with tilt-and-spotlight cards |
| **Data & ML** | An animated extract → transform → model → serve pipeline and the data projects behind it |
| **Case studies** | One page per project: problem, key features, results, challenges and lessons, plus an **architecture grid** of every layer of the stack |
| **Journey** | Education, certification and volunteering on a timeline that draws itself as you scroll |
| **Open source** | A live GitHub contribution calendar |
| **Blog** | Long-form notes written in MDX |
| **Resume** | A LaTeX CV that compiles straight into the site's download button |

### Projects featured

- **[Bustandeen](https://istiak.is-a.dev/projects/bustandeen)**: an offline-first Islamic worship companion (PWA) live at bustandeen.com
- **[FinTrack](https://istiak.is-a.dev/projects/fintrack)**: personal finance with ten AI features on Groq
- **[Mercari Price Suggestion](https://istiak.is-a.dev/projects/mercari-price-suggestion)**: an NLP + LightGBM pricing pipeline served over FastAPI
- **[Adaptive Rating System](https://istiak.is-a.dev/projects/adaptive-rating-thesis)**: undergraduate thesis on Bayesian, manipulation-resistant product ratings

## Built with

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, fully static) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 with a custom warm design-token theme |
| Motion | Framer Motion · GSAP + ScrollTrigger · Lenis smooth scroll · a hand-written canvas particle system |
| Content | MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`) for case studies and posts |
| CV | LaTeX, built with `make` into both PDF versions and the site's resume file |
| Services | Web3Forms (contact form) · GA4 (optional) · Vercel hosting |

## Engineering notes

- **Content is data.** Projects, skills, timeline and identity live in typed files under `lib/data/`; case studies and posts are MDX under `content/`. Adding a project never touches a component.
- **One source of identity.** `lib/data/site.ts` feeds the hero, contact section, footer, SEO metadata, JSON-LD and the generated social card.
- **Motion that respects people.** Every animation honours `prefers-reduced-motion`; the custom cursor and particle canvas run only on mouse-driven devices, and the canvas pauses when it scrolls off-screen.
- **SEO built in.** Per-page metadata, a `Person` JSON-LD schema, a generated sitemap and robots file, and a dynamic Open Graph image rendered at build time.
- **Accessible by default.** Skip link, labelled icon-only controls, decorative layers hidden from screen readers, visible focus rings.
- **Zero backend, zero cost.** Every route is prerendered; the whole site runs on free tiers.

## Structure

```
app/          routes: home, projects/[slug], blog, sitemap, robots, OG image
components/   hero, sections, motion effects (fx/), MDX renderer, icons
content/      projects/*.mdx and blog/*.mdx
lib/data/     site, projects, skills, timeline (the editable content)
cv/           LaTeX source and the compiled CV PDFs
```

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Maintaining the content (adding projects, writing posts, rebuilding the CV) is documented in [`docs/EDITING.md`](docs/EDITING.md).

## Contact

[istiak.is-a.dev](https://istiak.is-a.dev) · [isttiiak@gmail.com](mailto:isttiiak@gmail.com) · [LinkedIn](https://www.linkedin.com/in/isttiiak) · [Telegram @iscoffey](https://t.me/iscoffey)
