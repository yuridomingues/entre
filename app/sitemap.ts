import type { MetadataRoute } from "next";
import { publicSlugs } from "@/lib/experiments";
export default function sitemap():MetadataRoute.Sitemap{
  const base="https://entre-ideias.vercel.app";
  const pages=[...publicSlugs,"sobre","fontes"];
  return [{url:base,priority:1},...pages.map(slug=>({url:base+"/"+slug,priority:slug==="sobre"||slug==="fontes"?.5:.8}))];
}
