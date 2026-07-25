import type { MetadataRoute } from "next";

// SEO task: build plan §10 item 14.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://reviw.app";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/for-agencies`, lastModified: new Date() },
  ];
}
