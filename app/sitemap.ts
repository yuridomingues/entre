import type { MetadataRoute } from "next";
import { publicSlugs } from "@/lib/experiments";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.GITHUB_ACTIONS === "true"
    ? "https://yuridomingues.github.io/entre"
    : "https://entre-ideias.vercel.app";
  const pages = [...publicSlugs, "sobre", "fontes"];
  return [
    { url: base, priority: 1 },
    ...pages.map((slug) => ({
      url: `${base}/${slug}`,
      priority: slug === "sobre" || slug === "fontes" ? 0.5 : 0.8,
    })),
  ];
}
