import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kandco.io";
  return [
    { url: base, lastModified: new Date() },
    { url: base + "/services", lastModified: new Date() },
    { url: base + "/how-we-work", lastModified: new Date() },
    { url: base + "/pricing", lastModified: new Date() },
    { url: base + "/case-studies", lastModified: new Date() },
    { url: base + "/contact", lastModified: new Date() },
    { url: base + "/privacy", lastModified: new Date() },
    { url: base + "/terms", lastModified: new Date() },
  ];
}
