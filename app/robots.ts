import type { MetadataRoute } from "next";

// SEO task: build plan §10 item 14.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://reviw.app/sitemap.xml",
  };
}
