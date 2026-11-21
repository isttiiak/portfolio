import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  date?: string;
  year?: string;
  role?: string;
  stack?: string[];
  tags?: string[];
  live?: string;
  github?: string;
  order?: number;
  architecture?: { layer: string; tech: string }[];
}

export interface Doc {
  meta: DocMeta;
  content: string;
}

function docsPath(dir: "projects" | "blog") {
  return path.join(contentDir, dir);
}

export function getDocSlugs(dir: "projects" | "blog"): string[] {
  return fs
    .readdirSync(docsPath(dir))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDoc(dir: "projects" | "blog", slug: string): Doc | null {
  const file = path.join(docsPath(dir), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as DocMeta, content };
}

export function getAllDocs(dir: "projects" | "blog"): Doc[] {
  return getDocSlugs(dir)
    .map((slug) => getDoc(dir, slug))
    .filter((d): d is Doc => d !== null)
    .sort((a, b) => {
      // Docs with an explicit `order` come first (ascending), the rest newest-first
      const ao = a.meta.order;
      const bo = b.meta.order;
      if (ao !== undefined && bo !== undefined) return ao - bo;
      if (ao !== undefined) return -1;
      if (bo !== undefined) return 1;
      return (b.meta.date ?? "").localeCompare(a.meta.date ?? "");
    });
}

/** True when content/projects/<slug>.mdx exists (a card links to it only if also flagged `caseStudy`). */
export function hasCaseStudyPage(slug: string): boolean {
  return getDocSlugs("projects").includes(slug);
}

/**
 * Format a frontmatter date ("2026-05-10"). Date-only strings parse as UTC midnight,
 * so format in UTC too; otherwise a build west of UTC shows the previous day.
 */
export function formatDate(date?: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
