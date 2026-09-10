import type { MetadataRoute } from "next";
const slugs=["arvore","mente","musica","conversa","vida","sobre","fontes"];
export default function sitemap():MetadataRoute.Sitemap{
  const base="https://entre-ideias.vercel.app";
  return [{url:base,priority:1},...slugs.map(slug=>({url:`${base}/${slug}`,priority:slug==="sobre"||slug==="fontes"?.5:.8}))];
}
