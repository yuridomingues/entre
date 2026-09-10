import type { MetadataRoute } from "next";
import { experiments } from "@/lib/experiments";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://entre-ideias.vercel.app";
  return [{ url: base, priority: 1 }, { url: `${base}/sobre`, priority: .5 }, ...experiments.map(x => ({ url: `${base}/${x.slug}`, priority: .8 }))];
}
