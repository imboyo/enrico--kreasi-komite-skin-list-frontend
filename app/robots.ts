// Robots — tells crawlers what to index and points to the sitemap
import type { MetadataRoute } from "next";

const BASE_URL = "https://skinlist.kreasikomite.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth", "/app", "/add-super-admin"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
