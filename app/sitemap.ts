import type { MetadataRoute } from "next";
import { getDocSlugs } from "@/lib/mdx";
import { site } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, priority: 0.7 },
    ...getDocSlugs("projects").map((slug) => ({
      url: `${site.url}/projects/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...getDocSlugs("blog").map((slug) => ({
      url: `${site.url}/blog/${slug}`,
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
