// Sitemap — helps Google and other search engines discover all pages
import type { MetadataRoute } from "next";

const BASE_URL = "https://skinlist.kreasikomite.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
