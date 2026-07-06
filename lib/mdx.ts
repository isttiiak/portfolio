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
      if (a.meta.order !== undefined && b.meta.order !== undefined) {
        return a.meta.order - b.meta.order;
      }
      return (b.meta.date ?? "").localeCompare(a.meta.date ?? "");
    });
}
