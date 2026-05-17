import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Allow all major AI training and search crawlers explicitly
      { userAgent: "GPTBot",         allow: "/" },
      { userAgent: "ChatGPT-User",   allow: "/" },
      { userAgent: "OAI-SearchBot",  allow: "/" },
      { userAgent: "PerplexityBot",  allow: "/" },
      { userAgent: "ClaudeBot",      allow: "/" },
      { userAgent: "Anthropic-AI",   allow: "/" },
      { userAgent: "cohere-ai",      allow: "/" },
      { userAgent: "Amazonbot",      allow: "/" },
      { userAgent: "YouBot",         allow: "/" },
      { userAgent: "Applebot",       allow: "/" },
      { userAgent: "Bingbot",        allow: "/" },
      { userAgent: "DuckDuckBot",    allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot",     allow: "/" },
      { userAgent: "LinkedInBot",    allow: "/" },
      // Block admin from all crawlers
      { userAgent: "*", disallow: ["/admin/", "/api/"] },
    ],
    sitemap: "https://ikfoodug.com/sitemap.xml",
    host: "https://ikfoodug.com",
  };
}
