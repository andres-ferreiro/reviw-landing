import type { MetadataRoute } from "next";

// AI/LLM crawlers and answer-engine agents, allowed explicitly so a future
// tightening of the "*" rule can't silently cut the site out of AI search
// and chatbot citations without someone noticing.
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "cohere-ai",
  "meta-externalagent",
];

// SEO task: build plan §10 item 14.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_USER_AGENTS, allow: "/" },
    ],
    sitemap: "https://reviw.app/sitemap.xml",
  };
}
