import { site } from "@/lib/data/site";

// Refresh once a day. Next.js caches the response and regenerates the home
// page in the background (ISR), so visitors never wait on GitHub.
const ONE_DAY = 60 * 60 * 24;

/**
 * Public repo count for `site.handle`, from GitHub's public API (no token).
 * Falls back to `site.publicRepos` if GitHub is unreachable or rate-limited,
 * so the page always renders a sensible number.
 */
export async function getPublicRepoCount(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/users/${site.handle}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
      next: { revalidate: ONE_DAY },
    });
    if (!res.ok) return site.publicRepos;
    const data: { public_repos?: unknown } = await res.json();
    return typeof data.public_repos === "number" && data.public_repos > 0
      ? data.public_repos
      : site.publicRepos;
  } catch {
    return site.publicRepos;
  }
}
